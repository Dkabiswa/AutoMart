import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('Cars', () => {
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
