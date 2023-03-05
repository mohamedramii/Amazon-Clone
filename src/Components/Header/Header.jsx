import React from "react";
import styles from "./Header.module.css";
import cx from "classnames";
import { Link } from "react-router-dom";
import logoHeader from "../../assets/header-logo.png"
import searchIcon from "../../assets/searchIcon.png"
import shoppingCard from "../..//assets/shopping-cart.png"
import { useAuth } from "../../context/GlobalState";
import {auth} from "../..//Firebase.js"

const Header = () => {

  const { user , basket} = useAuth();
const handleSignOut = () => {
auth.signOut()
}

  return (
    <div className={styles.header}>
      <Link to='/'>
        <img className={styles.logoHeader} src={logoHeader} alt='logoHeader' />
      </Link>
      <div className={styles.headerSearch}>
        <input type='text' className={styles.headerSearchInput} />
        <img className={styles.searchIcon} src={searchIcon} alt='searchIcon' />
      </div>
      <div className={styles.headerNav}>
        <Link to={!user && "/login"}>
          <div className={styles.headerOption} onClick={handleSignOut}>
            <div className={styles.headerOptionLineOne}>
              Hello {user ? `${user.email}` : "Guest"}{" "}
            </div>
            <div className={styles.headerOptionLineTwo}>
              {user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </Link>
        <Link to='/orders'>
          <div className={styles.headerOption}>
            <div className={styles.headerOptionLineOne}>Returns</div>
            <div className={styles.headerOptionLineTwo}>& orders</div>
          </div>
        </Link>
        <div className={styles.headerOption}>
          <div className={styles.headerOptionLineOne}>Your</div>
          <div className={styles.headerOptionLineTwo}>Prime</div>
        </div>
        <Link to='/checkout'>
          <div className={styles.headerOptionBasket}>
            <img className={styles.shoppingCard} src={shoppingCard} alt='' />
            <span
              className={cx(
                styles.headerOptionLineTwo,
                styles.headerBasketCount
              )}>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
