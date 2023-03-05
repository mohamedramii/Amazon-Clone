import React from 'react'
import styles from "./CheckOutProduct.module.css";
import starIcon from "../../../assets/star.png";
import { useAuth } from '../../../context/GlobalState';
const CheckOutProduct = ({ id, title, price, rating, image, hiddenButton }) => {
  const { dispatch } = useAuth();

  const rmvFromBskt = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className={styles.ChOutItems}>
      <div className={styles.ChOutItemsLeft}>
        <div className={styles.ChOutItemImg}>
          <img src={image} alt='Product' />
        </div>
      </div>
      <div className={styles.ChOutItemsRight}>
        <div className={styles.ChOutItemTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.ChOutItemPrice}>
          <small></small>
          <h4>${price}</h4>
        </div>
        <div className={styles.ChOutItemRating}>
          <img
            src={Array(rating)
              .fill()
              .map((_, i) => (
                <img src={starIcon} alt='' />
              ))}
            alt=''
          />
        </div>
        <div className={styles.ChOutItemBtn}>
          {!hiddenButton && (
            <button onClick={rmvFromBskt}>Remove From Basket</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOutProduct