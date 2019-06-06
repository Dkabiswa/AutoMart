import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('ORDER', () => {
  describe('POST/' , () =>{
    it('should create a new purchase order', (done) => {
      const order = {
      	buyer: 1,
      	carId: 2,
      	amount: 1000,
      }
      chai.request(server)
      .post('/api/v1/order/')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.have.property('id')
        res.body.data.should.have.property('createdOn')
        done();
      });
    });
    it('should not create a new purchase order with missing fields', (done) => {
      const order = {
      	buyer: 1,
      	amount: 1000,
      }
      chai.request(server)
      .post('/api/v1/order/')
      .send(order)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        done();
      });
    });
    it('should not create a new purchase order with wrong carId', (done) => {
      const order = {
      	buyer: 1,
      	carId: 200,
      	amount: 1000,
      }
      chai.request(server)
      .post('/api/v1/order/')
      .send(order)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
        done();
      });
    });
  });
});