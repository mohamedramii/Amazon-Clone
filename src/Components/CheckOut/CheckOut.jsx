import React from "react";
import styles from "./CheckOut.module.css";
import CheckOutAdv from "../..//assets/checkoutAd.jpg";
import { useAuth } from "../../context/GlobalState";

import CheckOutProduct from "./CheckOutProduct/CheckOutProduct";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { user, basket } = useAuth();
  return (
    <div className={styles.CheckOut}>
      <div className={styles.ChOutContainer}>
        <div className={styles.ChOutLeft}>
          <div className={styles.ChOutAdv}>
            <img src={CheckOutAdv} alt='CheckOutAdv' />
          </div>
          <div className={styles.ChOutEmail}>
            <h3>Hello , {user?.email}</h3>
          </div>
          <div className={styles.ChOutTitle}>
            <h2>Your Shopping Basket</h2>
          </div>

          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckOutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <h2>
              You have no items in your basket . To buy one or more items ,
              click "Add to basket"
            </h2>
          )}
        </div>
        <div className={styles.ChOutRight}>
          <div className={styles.ChOutProcs}>
            <div className={styles.ChOutProcsBox}>
              <div className={styles.ChOutProcsTitle}>
                <p>
                  Subtotal ({basket.length} items) : $
                  {basket
                    .reduce((total, item) => (total += item.price), 0)
                    .toLocaleString("en-US")}
                </p>
              </div>
              <div className={styles.ChOutProcsGift}>
                <input type='checkbox' />
                <span>This order contains a Gift</span>
              </div>
              <div className={styles.ChOutProcsBtn}>
                <button onClick={() => navigate("/payment")}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
