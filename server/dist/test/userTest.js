"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe('/POST Register', function () {
  it('it should Sign up', function (done) {
    var details = {
      email: 'mgrrrt@gmail.com',
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gDFdat1234',
      address: 'mukono',
      isAdmin: true
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      done();
    });
  });
  it('it should not Sign up with missing fields', function (done) {
    var details = {
      id: 1,
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gdat1234',
      address: 'mukono',
      isAdmin: false
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('it should not Sign up if email already exists', function (done) {
    var details = {
      email: 'mgrrrt@gmail.com',
      firstName: 'mgat',
      lastName: 'dgat',
      password: 'gDFdat1234',
      address: 'mukono',
      isAdmin: true
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('Should LOGIN if credential is valid', function (done) {
    var details = {
      email: 'mgrrrt@gmail.com',
      password: 'gDFdat1234'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/login').send(details).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('data');
      res.body.data.should.have.property('Token');
      done();
    });
  });
  it('Should not LOGIN if one field is missing', function (done) {
    var details = {
      email: '',
      password: 'gDFdat1234'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/login').send(details).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.have.property('error');
      done();
    });
  });
  it('Should not LOGIN if wrong email is given', function (done) {
    var details = {
      email: 't@gmail.com',
      password: 'gdat1234'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/login').send(details).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('message');
      done();
    });
  });
  it('Should not LOGIN if wrong password is given', function (done) {
    var details = {
      email: 'mgrrrt@gmail.com',
      password: 'gda'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/auth/login').send(details).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.have.property('message');
      done();
    });
  });
});