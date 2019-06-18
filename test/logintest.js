/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();

describe('/ LOGIN', () => {
  const email = faker.internet.email();
  const details = {
    email,
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: true,
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(201);
        console.log(res);
        res.body.should.have.property('data');
        done();
      });
  });
  const logdetail = {
    email,
    password: 'gdat1234',
  };
  it('Should LOGIN if credential is valid', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(logdetail)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        res.body.data.should.have.property('Token');
        done();
      });
  });
  it('Should not LOGIN if one field is missing', (done) => {
    const details = {
      email: '',
      password: 'gDFdat1234',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('Should not LOGIN if wrong email is given', (done) => {
    const details = {
      email: 't@gmail.com',
      password: 'gdat1234',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
  it('Should not LOGIN if wrong password is given', (done) => {
    const details = {
      email,
      password: 'gda',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
  });
});
