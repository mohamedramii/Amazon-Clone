import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { auth } from "../src/Firebase";
import { useAuth } from "./context/GlobalState";
import Home from "./Components/Home/Home";
import CheckOut from "./Components/CheckOut/CheckOut";
import Payment from "./Components/Payment/Payment";
import Orders from "./Components/Orders/Orders";
import { Elements } from "@stripe/react-stripe-js";
const App = () => {
  const { dispatch , basket } = useAuth();
  const stripePromise = loadStripe(
    'pk_test_51MhZW8AKfUxh9wxychQEMgpLO3kfoDB4dRW6O1WHRIXzgcLibF7sFmpoK0xwPMeIsbwpmrDLtTAVf53Nb1dyJPIy00ArxKkreN'
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path='/checkout'
          element={
            <>
              <Header />
              <CheckOut />
            </>
          }
        />
        <Route
          path='/payment'
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment  />
              </Elements>
            </>
          }
        />

        <Route
          path="/orders"
          element={
            <>
              <Header />
              <Orders />
            </>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
