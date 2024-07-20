const Account = require('../models/account');
const Transaction = require('../models/transaction');

async function transfer(sourceAccountNumber, destinationAccountNumber, amount) {
  const session = await Account.startSession();
  session.startTransaction();
  
  try {
    const sourceAccount = await Account.findOne({ accountNumber: sourceAccountNumber }).session(session);
    const destinationAccount = await Account.findOne({ accountNumber: destinationAccountNumber }).session(session);

    if (!sourceAccount || !destinationAccount) {
      throw new Error('One or both accounts do not exist.');
    }

    if (sourceAccount.balance < amount) {
      throw new Error('Insufficient funds in the source account.');
    }

    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    const transaction = new Transaction({
      sourceAccountNumber,
      destinationAccountNumber,
      amount
    });

    await sourceAccount.save({ session });
    await destinationAccount.save({ session });
    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = { transfer };
