import React, { useState } from "react";
import styles from "./Login.module.css";
import logoHeader from "../..//assets/login-logo.png";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../Firebase";

const Login = () => {
  // const { user } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handleSingIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((auth) => {
      if (auth) {
        navigate("/");
      }
    })
    .catch((error) => {
      alert(error.message)
    })
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <Link to='/'>
        <img className={styles.logoHeader} src={logoHeader} alt='' />
      </Link>

      <div className={styles.loginContainer}>
        <div className={styles.loginTitle}>
          <h1>Sign In</h1>
        </div>
        <div className={styles.loginInputs}>
          <p className={styles.titleInput}>E-mail</p>
          <input
            className={styles.labelInput}
            type='email'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <p className={styles.titleInput}>Password</p>
          <input
            className={styles.labelInput}
            type='password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className={styles.loginBtn}>
          <button type='submit' onClick={handleSingIn}>
            Sign in
          </button>
        </div>
        <div className={styles.loginPara}>
          By continuing , you agree to Amazon's Fake Clone Conditions of Use and
          Privacy Notice
        </div>
        <div className={styles.signupBtn} onClick={register}>
          <button>Create Your Amazon Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
