const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);

