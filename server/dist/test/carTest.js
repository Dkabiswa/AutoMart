"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var token;
var tok;
describe('/ all undefined routes', function () {
  it('should return invalid url for undefined routes', function (done) {
    _chai["default"].request(_index["default"]).get('/api/fggghuiiggytft').end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      done();
    });
  });
});
describe('/ CARS', function () {
  var details = {
    email: 'mgat@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: true
  };
  var det = {
    email: 'test@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: false
  };
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('data');
      token = res.body.data.Token;

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(det).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('data');
        tok = res.body.data.Token;
        done();
      });
    });
  });
  it('it should POST a car', function (done) {
    var car = {
      id: 1,
      owner: 2,
      state: 'new',
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', token).send(car).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.data.should.have.property('id');
      done();
    });
  });
  it('should list all Cars on /car GET if user is admin', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car/').set('Authorization', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not list all Cars if not admin', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car/').set('Authorization', tok).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should list all unsold cars for all users', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car?status=available').set('Authorization', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not list all unsold cars if status is not set available', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car?status=thhhth').set('Authorization', token).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should return a specific car ', function (done) {
    var carId = 1;

    _chai["default"].request(_index["default"]).get("/api/v1/car/".concat(carId)).set('Authorization', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('price');
      res.body.data.id.should.equal(carId);
      done();
    });
  });
  it('should not return a car when Id is not an integer ', function (done) {
    var carId = 'hihioigh';

    _chai["default"].request(_index["default"]).get("/api/v1/car/".concat(carId)).set('Authorization', token).end(function (err, res) {
      res.should.have.status(400);
      done();
    });
  });
  it('should return a car which does not exisit ', function (done) {
    var carId = 10;

    _chai["default"].request(_index["default"]).get("/api/v1/car/".concat(carId)).set('Authorization', token).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
  it('should not list all unsold cars in a price range', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car?status=available&minPrice=800&maxPrice=100').set('Authorization', token).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should list all unsold cars in a price range', function (done) {
    _chai["default"].request(_index["default"]).get('/api/v1/car?status=available&minPrice=100&maxPrice=500').set('Authorization', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('it should not POST a car missing required fields', function (done) {
    var car = {
      owner: 2,
      price: 300,
      manufacturer: 'Benz',
      model: 'C-class',
      bodyType: 'Truck'
    };

    _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', token).send(car).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });
  it('it should mark a car sold', function (done) {
    var details = {
      status: 'sold'
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/1/status').set('Authorization', token).send(details).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('data');
      res.body.data.should.have.property('id');
      res.body.data.status.should.equal(details.status);
      done();
    });
  });
  it('it should not mark a car sold if status is not set to sold', function (done) {
    var details = {
      status: 'drydgghhj'
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/1/status').set('Authorization', token).send(details).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('it should not mark a car sold if id doesnt exisit', function (done) {
    var details = {
      status: 'sold'
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/10/status').set('Authorization', token).send(details).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  it('it should not mark a car sold if id is not an integer', function (done) {
    var details = {
      status: 'sold'
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/"hdhhdh"/status').set('Authorization', token).send(details).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should update price of a car', function (done) {
    var car = {
      price: 1000
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/1/price/').set('Authorization', token).send(car).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('price');
      res.body.data.price.should.equal(car.price);
      done();
    });
  });
  it('it should not update car price if new price doesnt exisit', function (done) {
    var car = {
      price: ''
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/1/price').set('Authorization', token).send(car).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
  it('it should not update car price if id doesnt exisit', function (done) {
    var car = {
      price: 40000
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/car/5/price').set('Authorization', token).send(car).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    });
  });
});
describe('/DELETE CARS', function () {
  var details = {
    email: 'mgat@gmail.com',
    password: 'gdat1234'
  };
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/login').send(details).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('data');
      token = res.body.data.Token;
      done();
    });
  });
  it('should delete a car advert', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/car/1').set('Authorization', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('CarAd sucessfully deleted');
      done();
    });
  });
  it('should not delete a car advert if id is not an integer', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/car/"uihuiuh"').set('Authorization', token).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not delete a car advert which doesnot exisit', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/car/200').set('Authorization', token).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('car not found');
      done();
    });
  });
  it('should not delete car if not admin', function (done) {
    _chai["default"].request(_index["default"])["delete"]('/api/v1/car/1').set('Authorization', tok).end(function (err, res) {
      res.should.have.status(403);
      res.body.should.be.a('object');
      done();
    });
  });
});