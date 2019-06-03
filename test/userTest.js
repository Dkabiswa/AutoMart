import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('/POST Register', () => {
  it('it should Sign up', (done) => {
    const details = {};
    chai.request(server)
    .post('/api/v1/auth/signup')
    .send(details) 
    .end((err, res) => { 
      res.should.have.status(201);
      res.body.data.should.be.an('object');
      done(); 
    })
  })
});
