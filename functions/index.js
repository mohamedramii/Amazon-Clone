const functions = require("firebase-functions");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

// App Config
const app = express();

// middlewares

app.use(cors());

app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // Ok - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// example endpoint

// http://127.0.0.1:5001/fir-fc06b/us-central1/api

// Listen Command

exports.api = functions.https.onRequest(app);
