const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "pk_test_51IKPOtAFG89GSE53ufOKkSmrPREaIMBwhDjtKouCPeijIxobrqoxiAJiOI38Uu3fSBmM8PI65CwTXl2X7LpKIMC500133jmcEB"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log(total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//exports.api = functions.https.onRequest(app);
app.listen(5000);
