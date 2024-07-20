const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Account = require('../models/account');

chai.use(chaiHttp);
const { expect } = chai;

describe('Account API', () => {
  before(async () => {
    await Account.deleteMany({});
  });

  it('should create a new account', (done) => {
    chai.request(app)
      .post('/accounts')
      .send({ accountNumber: '123456', balance: 1000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('accountNumber', '123456');
        expect(res.body).to.have.property('balance', 1000);
        done();
      });
  });
});
