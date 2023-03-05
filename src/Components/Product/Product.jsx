import React from "react";
import styles from "./Product.module.css";
import starIcon from "../..//assets/star.png";
import { useAuth } from "..//..//context/GlobalState";
const Product = ({ title, price, image, rating, id }) => {
  const { dispatch } = useAuth();
  const addToBskt = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  
  return (
    <div className={styles.product}>
      <div className={styles.productInfo}>
        <p>{title}</p>
        <p className={styles.productPrice}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className={styles.productRating}>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <p>
              <img  src={starIcon} alt='' />
            </p>
          ))}
      </div>
      <img src={image} alt='' />
      <button onClick={addToBskt}>Add To Basket</button>
    </div>
  );
};

export default Product;
