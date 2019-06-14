import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();

let token;

describe('ORDER', () => {
  const details = {
    email: 'mgqat@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: true,
  };
  const car = {
    id: 2,
    owner: 3,
    state: 'old',
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
  it('should create a new purchase order', (done) => {
    const order = {
      id: 3,
      buyer: 1,
      carId: 2,
      amount: 1000.0,
    };
    chai.request(server)
      .post('/api/v1/order/')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdOn');
        done();
      });
  });
  it('should not create a new purchase order with missing fields', (done) => {
    const order = {
      buyer: 1,
      amount: 1000,
    };
    chai.request(server)
      .post('/api/v1/order/')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not create a new purchase order with a car which does not exist', (done) => {
    const order = {
      buyer: 1,
      carId: 200,
      amount: 1000,
    };
    chai.request(server)
      .post('/api/v1/order/')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Update Order', () => {
  it('should update price of a purchase order', (done) => {
    const order = {
      newAmount: 1000,
    };
    chai.request(server)
      .patch('/api/v1/order/3/price/')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('newPriceOffered');
        res.body.data.should.have.property('oldPriceOffered');
        res.body.data.newPriceOffered.should.equal(order.newAmount);
        done();
      });
  });
  it('it should not update order price if newAmount  doesnt exisit', (done) => {
    const order = { newAmount: '' };
    chai.request(server)
      .patch('/api/v1/order/3/price')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should not update order price if car doesnt exisit', (done) => {
    const order = { newAmount: 40000 };
    chai.request(server)
      .patch('/api/v1/order/10/price')
      .set('Authorization', token)
      .send(order)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});
