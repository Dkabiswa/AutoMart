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
      	carId: 4,
      	amount: 1000,
      }
      chai.request(server)
      .post('/api/v1/order/')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id')
        res.body.should.have.property('createdOn')
        done();
      });
    });
  });
});