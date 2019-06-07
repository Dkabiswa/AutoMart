import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import auth from '../src/auth/local';

chai.use(chaiHttp);
chai.should();

describe('Test Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    next = sinon.spy();
  });
  it('should return a token', (done) => {
    const results = auth.createToken({ id: 6 });
    results.should.exist;
    results.should.be.a('string');
    done();
  });

  it('next should not be called if no token provided', () => {
  	req.headers = {};
    auth.verifyUser(req, res, next);
    next.called.should.equal(false);
    res.status.getCall(0).args[0].should.equal(401);
  });

  it('next should not be called if bad token was provided', () => {
    req.headers = {};
    req.headers.authorization = 'some authorization header';
    auth.verifyUser(req, res, next);
    next.called.should.equal(false);
    res.status.getCall(0).args[0].should.equal(401);
  });

  it('request should contain user info if good token was provided', () => {
    req.headers = {};
    req.headers.authorization = auth.createToken({ id: 1 });
    auth.verifyUser(req, res, next);
    req.should.have.property('user');
    req.user.should.have.property('id');
    req.user.id.should.equal(1);
    next.called.should.equal(true);
  });
});
