import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('Cars', () => {
  describe('GET/' , () =>{
    it('should list ALL unsold cars on /cars GET', (done) => {
      chai.request(server)
      .get('/api/v1/cars')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
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
      .post('/api/v1/cars')
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
      .post('/api/v1/cars')
      .send(car)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
    });
  });
})
