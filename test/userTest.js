/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';

chai.use(chaiHttp);

describe('/SIGNUP', () => {
  const email = faker.internet.email();
  const details = {
    email,
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'password',
    address: 'mukono',
    isAdmin: true,
  };

  it('it should Sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not Sign up with missing fields', (done) => {
    const info = {
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: false,
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(info)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not Sign up if email already exists', (done) => {
    const detail = {
      email,
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gDFdat1234',
      address: 'mukono',
      isAdmin: true,
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(detail)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        done();
      });
  });
});
