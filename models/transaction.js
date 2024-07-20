const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sourceAccountNumber: { type: String, required: true },
  destinationAccountNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
