const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Account = require('../models/account');
const Transaction = require('../models/transaction');

chai.use(chaiHttp);
const { expect } = chai;

describe('Transaction API', () => {
  before(async () => {
    await Account.deleteMany({});
    await Transaction.deleteMany({});

    await Account.create([
      { accountNumber: '123456', balance: 1000 },
      { accountNumber: '654321', balance: 500 }
    ]);
  });

  it('should create a new transaction', (done) => {
    chai.request(app)
      .post('/transactions')
      .send({ sourceAccountNumber: '123456', destinationAccountNumber: '654321', amount: 200 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('sourceAccountNumber', '123456');
        expect(res.body).to.have.property('destinationAccountNumber', '654321');
        expect(res.body).to.have.property('amount', 200);
        done();
      });
  });
});
