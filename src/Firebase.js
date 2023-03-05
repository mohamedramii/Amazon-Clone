import { initializeApp } from "firebase/app";//Create App for firebase
import { getAuth } from 'firebase/auth' //use or create auth method
import { getFirestore } from 'firebase/firestore' //use or create database method

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);  //Create App for firebase
const  auth = getAuth(app) //getAuth Take parameter from app to use in app
const db = getFirestore(app) //getFirestore Take parameter from app to use in app

export {auth , db}