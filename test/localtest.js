import chai from 'chai';
import chaiHttp from 'chai-http';
import auth from '../src/auth/local';

chai.use(chaiHttp);
chai.should();


describe('AUTH ', () => {
  it('should return a token', (done) => {
    const results = auth.createToken(6);
    results.should.exist;
    results.should.be.a('string');
    done();
  });
});
