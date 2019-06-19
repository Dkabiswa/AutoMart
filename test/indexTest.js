/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();

describe('/ Home and errors', () => {
  it('should return welcome to automart', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return invalid url for undefined routes', (done) => {
    chai.request(server)
      .get('/api/fggghuiiggytft')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should return method not allowed', (done) => {
    const details = {
      email: 'mgrrrt@gmail.com',
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gDFdat1234',
      address: 'mukono',
      isAdmin: true,
    };
    chai.request(server)
      .patch('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(405);
        res.body.should.be.a('object');
        done();
      });
  });
});
