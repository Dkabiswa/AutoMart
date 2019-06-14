"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _sinon = _interopRequireDefault(require("sinon"));

var _auth = _interopRequireDefault(require("../src/middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('Test Auth Middleware', function () {
  var req;
  var res;
  var next;
  beforeEach(function () {
    req = {};
    res = {
      status: _sinon["default"].stub().returnsThis(),
      json: _sinon["default"].spy()
    };
    next = _sinon["default"].spy();
  });
  it('should return a token', function (done) {
    var results = _auth["default"].createToken({
      id: 6
    });

    results.should.exist;
    results.should.be.a('string');
    done();
  });
  it('next should not be called if no token provided', function () {
    req.headers = {};

    _auth["default"].verifyUser(req, res, next);

    next.called.should.equal(false);
    res.status.getCall(0).args[0].should.equal(401);
  });
  it('next should not be called if bad token was provided', function () {
    req.headers = {};
    req.headers.authorization = 'some authorization header';

    _auth["default"].verifyUser(req, res, next);

    next.called.should.equal(false);
    res.status.getCall(0).args[0].should.equal(401);
  });
  it('request should contain user info if good token was provided', function () {
    req.headers = {};
    req.headers.authorization = _auth["default"].createToken({
      id: 1
    });

    _auth["default"].verifyUser(req, res, next);

    req.should.have.property('user');
    req.user.should.have.property('id');
    req.user.id.should.equal(1);
    next.called.should.equal(true);
  });
});