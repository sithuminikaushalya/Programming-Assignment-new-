const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../app');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

chai.use(chaiHttp);
const { expect } = chai;

describe('Transaction API', () => {
  before(async () => {
    await Account.deleteMany({});
    await Transaction.deleteMany({});

    await Account.create([
      { accountNumber: '1001', balance: 1500 },
      { accountNumber: '1002', balance: 500 }
    ]);
  });

  after(() => {
    server.close();
  });

  it('should create a new transaction', (done) => {
    chai.request(app)
      .post('/transactions')
      .send({ sourceAccountNumber: '1001', destinationAccountNumber: '1002', amount: 200 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('sourceAccountNumber', '1001');
        expect(res.body).to.have.property('destinationAccountNumber', '1002');
        expect(res.body).to.have.property('amount', 200);
        done();
      });
  });
});
