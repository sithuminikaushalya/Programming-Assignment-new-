const Account = require('../models/account');
const Transaction = require('../models/transaction');

async function transfer(sourceAccountNumber, destinationAccountNumber, amount) {
  try {
    // Find source and destination accounts
    const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber });
    const destinationAccount = await Account.findOne({ accountNumber: destinationAccountNumber });

    // Check if both accounts exist
    if (!sourceAccount) {
      console.error(`Source account ${sourceAccountNumber} does not exist.`);
      throw new Error('Source account does not exist.');
    }
    if (!destinationAccount) {
      console.error(`Destination account ${destinationAccountNumber} does not exist.`);
      throw new Error('Destination account does not exist.');
    }

    // Check if source account has sufficient balance
    if (sourceAccount.balance < amount) {
      throw new Error('Insufficient funds in the source account.');
    }

    // Update balances
    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    // Create and save transaction record
    const transaction = new Transaction({
      sourceAccountNumber,
      destinationAccountNumber,
      amount
    });

    await sourceAccount.save();
    await destinationAccount.save();
    await transaction.save();

    return transaction;
  } catch (error) {
    console.error('Error processing transaction:', error);
    throw error;
  }
}

module.exports = { transfer };
