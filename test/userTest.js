import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('/POST Register', () => {
  it('it should Sign up', (done) => {
    const details = {
      email: 'test@gmail.com',
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
});
