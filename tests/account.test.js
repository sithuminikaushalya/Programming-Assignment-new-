const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../app');
const Account = require('../models/account');

chai.use(chaiHttp);
const { expect } = chai;

describe('Account API', () => {
  before(async () => {
    await Account.deleteMany({});
  });

  after(() => {
    server.close();
  });

  it('should create a new account', (done) => {
    chai.request(app)
      .post('/accounts')
      .send({ accountNumber: '1001', balance: 1500 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('accountNumber', '1001');
        expect(res.body).to.have.property('balance', 1500);
        done();
      });
  });
});
