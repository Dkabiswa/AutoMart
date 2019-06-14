import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server/index';


chai.use(chaiHttp);
chai.should();
let token;
let tok;
describe('/ all undefined routes', () => {
  it('should return invalid url for undefined routes', (done) => {
    chai.request(server)
      .get('/api/fggghuiiggytft')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('/ CARS', () => {
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
  it('it should POST a car', (done) => {
    const car = {
      id: 1,
      owner: 2,
      state: 'new',
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck',
    };
    chai.request(server)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(car)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        done();
      });
  });
  it('should list all Cars on /car GET if user is admin', (done) => {
    chai.request(server)
      .get('/api/v1/car/')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not list all Cars if not admin', (done) => {
    chai.request(server)
      .get('/api/v1/car/')
      .set('Authorization', tok)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should list all unsold cars for all users', (done) => {
    chai.request(server)
      .get('/api/v1/car?status=available')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should not list all unsold cars if status is not set available', (done) => {
    chai.request(server)
      .get('/api/v1/car?status=thhhth')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return a specific car ', (done) => {
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
  it('should not return a car when Id is not an integer ', (done) => {
    const carId = 'hihioigh';
    chai.request(server)
      .get(`/api/v1/car/${carId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('should return a car which does not exisit ', (done) => {
    const carId = 10;
    chai.request(server)
      .get(`/api/v1/car/${carId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
  it('should not list all unsold cars in a price range', (done) => {
    chai.request(server)
      .get('/api/v1/car?status=available&minPrice=800&maxPrice=100')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('should list all unsold cars in a price range', (done) => {
    chai.request(server)
      .get('/api/v1/car?status=available&minPrice=100&maxPrice=500')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not POST a car missing required fields', (done) => {
    const car = {
      owner: 2,
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck',
    };
    chai.request(server)
      .post('/api/v1/car')
      .set('Authorization', token)
      .send(car)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('it should mark a car sold', (done) => {
    const Status = { status: 'sold' };
    chai.request(server)
      .patch('/api/v1/car/1/status')
      .set('Authorization', token)
      .send(Status)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.status.should.equal(Status.status);
        done();
      });
  });
  it('it should not mark a car sold if status is not set to sold', (done) => {
    const Stat = { status: 'drydgghhj' };
    chai.request(server)
      .patch('/api/v1/car/1/status')
      .set('Authorization', token)
      .send(Stat)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should not mark a car sold if id doesnt exisit', (done) => {
    const Statu = { status: 'sold' };
    chai.request(server)
      .patch('/api/v1/car/10/status')
      .set('Authorization', token)
      .send(Statu)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('it should not mark a car sold if id is not an integer', (done) => {
    const Sta = { status: 'sold' };
    chai.request(server)
      .patch('/api/v1/car/"hdhhdh"/status')
      .set('Authorization', token)
      .send(Sta)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should update price of a car', (done) => {
    const Car = {
      price: 1000,
    };
    chai.request(server)
      .patch('/api/v1/car/1/price/')
      .set('Authorization', token)
      .send(Car)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('price');
        res.body.data.price.should.equal(Car.price);
        done();
      });
  });
  it('it should not update car price if new price doesnt exisit', (done) => {
    const cars = { price: '' };
    chai.request(server)
      .patch('/api/v1/car/1/price')
      .set('Authorization', token)
      .send(cars)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
  it('it should not update car price if id doesnt exisit', (done) => {
    const card = { price: 40000 };
    chai.request(server)
      .patch('/api/v1/car/5/price')
      .set('Authorization', token)
      .send(card)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
describe('/DELETE CARS', () => {
  const info = {
    email: 'mgat@gmail.com',
    password: 'gdat1234',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(info)
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
  it('should not delete a car advert if id is not an integer', (done) => {
    chai.request(server)
      .delete('/api/v1/car/"uihuiuh"')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
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
    chai.request(server)
      .delete('/api/v1/car/1')
      .set('Authorization', tok)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        done();
      });
  });
});
