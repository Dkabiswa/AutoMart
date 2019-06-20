/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();
let token;
let tok;
const email = faker.internet.email();
describe('/ admin', () => {
  const details = {
    email: 'admin@gmail.com',
    password: 'adminpassword1',
  };
  const det = {
    email,
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: false,
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        token = res.body.data.Token;
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(det)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property('data');
            tok = res.body.data.Token;
            done();
          });
      });
  });
  it('should update is_admin', (done) => {
    const user = {
      isAdmin: true,
    };
    chai.request(server)
      .patch('/api/v1/auth/admin/1')
      .set('Authorization', token)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message')
        done();
      });
  });
  it('should not update is_admin if user not admin', (done) => {
    const user = {
      isAdmin: true,
    };
    chai.request(server)
      .patch('/api/v1/auth/admin/1')
      .set('Authorization', tok)
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error')
        done();
      });
  });
  it('should not update is_admin if user not exist', (done) => {
    const user = {
      isAdmin: true,
    };
    chai.request(server)
      .patch('/api/v1/auth/admin/1888')
      .set('Authorization', tok)
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('error')
        done();
      });
  });
});