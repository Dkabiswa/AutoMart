import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();

let token;

describe('FLAG', () => {
  const details = {
    email: 'flag@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: false,
  };
  const car = {
    id: 5,
    owner: 3,
    state: 'used',
    price: 300,
    manufacturer: 'Benz',
    model: 'class',
    bodyType: 'Truck',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('data');
        token = res.body.data.Token;
        chai.request(server)
          .post('/api/v1/car')
          .set('Authorization', token)
          .send(car)
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });
  it('should flag a car fraudulent', (done) => {
    const flag = {
      id: 3,
      carId: 5,
      reason: 'stolen car.',
      description: 'Was reported to police on 2nd June.'
    };
    chai.request(server)
      .post('/api/v1/flag')
      .set('Authorization', token)
      .send(flag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        done();
      });
  });
  it('should create a another flag with incremented id', (done) => {
    const flag = {
      carId: 5,
      reason: 'stolen car.',
      description: 'Was reported to police on 2nd June.'
    };
    chai.request(server)
      .post('/api/v1/flag')
      .set('Authorization', token)
      .send(flag)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.id.should.be.equal(4)
        done();
      });
  });
  it('should not flag a car fraudulent if car doesnot exist', (done) => {
    const flag = {
      id: 3,
      carId: 10,
      reason: 'stolen car.',
      description: 'Was reported to police on 2nd June.'
    };
    chai.request(server)
      .post('/api/v1/flag')
      .set('Authorization', token)
      .send(flag)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should not flag a car fraudulent if missing required details', (done) => {
    const flag = {
      id: 3,
      description: 'Was reported to police on 2nd June.'
    };
    chai.request(server)
      .post('/api/v1/flag')
      .set('Authorization', token)
      .send(flag)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});