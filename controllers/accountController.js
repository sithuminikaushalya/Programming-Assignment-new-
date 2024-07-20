const Account = require('../models/account');

exports.createAccount = async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).send(account);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
