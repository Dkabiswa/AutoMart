import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('CARS', () => {
  describe('GET/', () => {
    it('should list ALL unsold cars on /cars GET', (done) => {
      chai.request(server)
        .get('/api/v1/car?status="available"')
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
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('price');
          res.body.data.id.should.equal(carId);
          done();
        });
    });
    it('should not return a specidfic cars with invalid id ', (done) => {
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

  describe('/POST car', () => {
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
  describe('/PATCH car', () => {
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
});
