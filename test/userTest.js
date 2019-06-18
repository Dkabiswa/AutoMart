import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';

chai.use(chaiHttp);

const email = faker.internet.email();
describe('/SIGNUP', () => {
  it('it should Sign up', (done) => {
    const details = {
      email,
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gDFdat1234',
      address: 'mukono',
      isAdmin: true,
    };
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
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('/LOGIN', () => {
  before((done) => {
    const details = {
    email: 'yeut@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: true,
   };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('Should LOGIN if credential is valid', (done) => {
    const details = {
      email: 'yeut@gmail.com',
      password: 'gdat1234',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
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
