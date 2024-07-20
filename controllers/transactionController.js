const { transfer } = require('../services/transferService');

exports.createTransaction = async (req, res) => {
  try {
    const { sourceAccountNumber, destinationAccountNumber, amount } = req.body;
    const transaction = await transfer(sourceAccountNumber, destinationAccountNumber, amount);
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
