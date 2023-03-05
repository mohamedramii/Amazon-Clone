import React, { useEffect } from "react";
import { useAuth } from "../../context/GlobalState";
import styles from "./Payment.module.css";
import { Link, useNavigate } from "react-router-dom";
import CheckOutProduct from "../CheckOut/CheckOutProduct/CheckOutProduct";
import axios from "../axios/axios";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { doc, setDoc } from "firebase/firestore";
import {db}  from "../../Firebase"
const Payment = () => {
  const { basket, user, dispatch } = useAuth();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const total = basket.reduce((total, item) => (total += item.price), 0);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [total]);

  const handleChange = (e) => {
    setdisabled(e.empty);
    seterror(error ? error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setprocessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({paymentIntent}) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setsucceeded(true);
        seterror(null);
        setprocessing(false);
        dispatch({
          type: "EMTPY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };
  return (
    <div className={styles.Payment}>
      <div className={styles.NumItems}>
        <p>
          Checkout (<Link to='/checkout'>{basket.length} items</Link>)
        </p>
      </div>
      <div className={styles.paymentBox}>
        <div className={styles.deliveryAdd}>
          <div className={styles.deliveryAddTitle}>Delivery Address</div>
          <div className={styles.deliveryAddData}>
            <p>{user?.email}</p>
            <p>Alexandria, Egypt</p>
          </div>
        </div>
        <div className={styles.RevSection}>
          <div className={styles.RevItemsTitle}>Review items and delivery</div>
          <div className={styles.RevItemsItems}>
            {basket.map((item) => (
              <CheckOutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className={styles.paymentMeth}>
          <div className={styles.paymentMethTitle}>Payment Method</div>
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />

            <div className={styles.paymentMethPrice}>
              <p>Order Total</p>
              {basket
                .reduce((total, item) => (total += item.price), 0)
                .toLocaleString("en-US")}
            </div>
            <div className={styles.paymentMethBtn}>
              <button
                disabled={processing || disabled || succeeded}
                type='submit'>
                {processing ? <p>Processing</p> : "Buy Now"}
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
