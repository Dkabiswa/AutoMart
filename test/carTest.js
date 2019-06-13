import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();
let token;
let tok;
describe('/GET CARS', () => {
    const details = {
      email: 'mgat@gmail.com',
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: true,
    };
    const det = {
      email: 'test@gmail.com',
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: false,
    };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(details)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('data');
        token = res.body.data.Token;
        .post('/api/v1/auth/signup')
        .send(det)
        .end((err, res)){
          res.should.have.status(201);
          res.body.should.have.property('data');
          tok = res.body.data.Token;
          done();
        }
      });
  });
  it('should list ALL Cars on /car GET', (done) => {
    chai.request(server)
      .get('/api/v1/car/')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not list ALL Cars if not admin', (done) => {
        chai.request(server)
          .get('/api/v1/car/')
          .set('Authorization', tok)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
          });
      });
  it('should list ALL unsold cars on /car GET', (done) => {
    chai.request(server)
      .get('/api/v1/car?status="available"')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return a specidfic cars ', (done) => {
    const carId = 1;
    chai.request(server)
      .get(`/api/v1/car/${carId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('price');
        res.body.data.id.should.equal(carId);
        done();
      });
  });
  it('should not list ALL unsold cars in a price range', (done) => {
    chai.request(server)
      .get('/api/v1/car?status="available"&minPrice=800&maxPrice=100')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should list ALL unsold cars in a price range', (done) => {
    chai.request(server)
      .get('/api/v1/car?status="available"&minPrice=100&maxPrice=500')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not return a car which doesnot exist ', (done) => {
    const carId = 200;
    chai.request(server)
      .get(`/api/v1/car/${carId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('/POST CAR', () => {
  it('it should POST a car', (done) => {
    const car = {
      owner: 2,
      state: 'new',
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck',
    };
    chai.request(server)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        done();
      });
  });

  it('it should not POST a car missing state or owner or price or manufacturer or model or bodytype', (done) => {
    const car = {
      owner: 2,
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck',
    };
    chai.request(server)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
describe('/PATCH CAR', () => {
  it('it should mark a car sold', (done) => {
    const details = { status: 'sold' };
    chai.request(server)
      .patch('/api/v1/car/1/status')
      .send(details)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.status.should.equal(details.status);
        done();
      });
  });
  it('it should not mark a car sold if id doesnt exisit', (done) => {
    const details = { status: 'sold' };
    chai.request(server)
      .patch('/api/v1/car/10/status')
      .send(details)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should update price of a car', (done) => {
    const car = {
      price: 1000,
    };
    chai.request(server)
      .patch('/api/v1/car/1/price/')
      .send(car)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('price');
        res.body.data.price.should.equal(car.price);
        done();
      });
  });
  it('it should not update car price if new price  doesnt exisit', (done) => {
    const car = { price: '' };
    chai.request(server)
      .patch('/api/v1/car/1/price')
      .send(car)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('it should not update car price if id doesnt exisit', (done) => {
    const car = { price: 40000 };
    chai.request(server)
      .patch('/api/v1/car/5/price')
      .send(car)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
describe('/DELETE CARS', () => {
  const details = {
    email: 'mgat@gmail.com',
    password: 'gdat1234',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(details)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        token = res.body.data.Token;
        done();
      });
  });
  it('should delete a car advert', (done) => {
    chai.request(server)
      .delete('/api/v1/car/1')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('CarAd sucessfully deleted');
        done();
      });
  });
  it('should not delete a car advert which doesnot exisit', (done) => {
    chai.request(server)
      .delete('/api/v1/car/200')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('car not found');
        done();
      });
  });
  it('should not delete car if not admin', (done) => {
    const user = {
      email: 'dkat@gmail.com',
      password: '12345',
    };
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('data');
        token = res.body.data.Token;

        chai.request(server)
          .delete('/api/v1/car/1')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            done();
          });
      });
  });
});
