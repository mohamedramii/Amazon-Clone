import React from "react";
import styles from "./Order.module.css";
import moment from "moment";
import CheckOutProduct from "../..//CheckOut/CheckOutProduct/CheckOutProduct";
import { useAuth } from "../../../context/GlobalState";
const Order = ({ order  }) => {

  const {basket} = useAuth()
  const amount = order.data.amount;
  return (
    <div className={styles.order}>
      <p>{moment.unix(order.data.created).format("MMM D0 YYYY h:mma")}</p>
      <p className={styles.orderID}>
        <small>{`Payment ID = ${order.id}`}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckOutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hiddenButton
        />
      ))}
      <h1 className={styles.OrderTotal}>{`Order Total : ${new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(amount / 100)}`}</h1>
    </div>
  );
};

export default Order;
