const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/accountTransfer')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/test-accounts', (req, res) => {
    res.send('Accounts route is working');
});

app.get('/test-transactions', (req, res) => {
    res.send('Transactions route is working');
});

