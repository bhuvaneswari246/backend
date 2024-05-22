const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/create-payment-intent', async (req, res) => {
  const { name, amount } = req.body;
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // convert to cents
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.post('/save-transaction', async (req, res) => {
  const { name, amount, transactionId } = req.body;
  try {
    const newTransaction = new Transaction({ name, amount, transactionId });
    await newTransaction.save();
    res.status(201).send('Transaction saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
