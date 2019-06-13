import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('/POST Register', () => {
  it('it should Sign up', (done) => {
    const details = {
      email: 'mgat@gmail.com',
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
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should not Sign up with missing fields', (done) => {
    const details = {
      id: 1,
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: false,
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not Sign up with exisiting email', (done) => {
    const details = {
      id: 1,
      firstName: 'mgat',
      email: 'mgat@gmail.com',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: false,
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('Should LOGIN if credential is valid', (done) => {
    const details = {
      email: 'mgat@gmail.com',
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
      password: 'gdat1234',
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
      email: 'mgat@gmail.com',
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

/* describe('/POST Login ', () => {

}); */
