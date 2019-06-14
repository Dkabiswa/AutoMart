"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

var token;
describe('ORDER', function () {
  var details = {
    email: 'mgqat@gmail.com',
    firstName: 'mgat',
    lastName: 'dgat',
    password: 'gdat1234',
    address: 'mukono',
    isAdmin: true
  };
  var car = {
    id: 2,
    owner: 3,
    state: 'old',
    price: 300,
    manufacturer: 'Benz',
    model: 'C-class',
    bodyType: 'Truck'
  };
  before(function (done) {
    _chai["default"].request(_index["default"]).post('/api/v1/auth/signup').send(details).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.have.property('data');
      token = res.body.data.Token;

      _chai["default"].request(_index["default"]).post('/api/v1/car').set('Authorization', token).send(car).end(function (err, res) {
        res.should.have.status(201);
        done();
      });
    });
  });
  it('should create a new purchase order', function (done) {
    var order = {
      id: 3,
      buyer: 1,
      carId: 2,
      amount: 1000.0
    };

    _chai["default"].request(_index["default"]).post('/api/v1/order/').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.have.property('id');
      res.body.data.should.have.property('createdOn');
      done();
    });
  });
  it('should not create a new purchase order with missing fields', function (done) {
    var order = {
      buyer: 1,
      amount: 1000
    };

    _chai["default"].request(_index["default"]).post('/api/v1/order/').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      done();
    });
  });
  it('should not create a new purchase order with a car which does not exist', function (done) {
    var order = {
      buyer: 1,
      carId: 200,
      amount: 1000
    };

    _chai["default"].request(_index["default"]).post('/api/v1/order/').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      done();
    });
  });
});
describe('Update Order', function () {
  it('should update price of a purchase order', function (done) {
    var order = {
      newAmount: 1000
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/order/3/price/').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.data.should.have.property('newPriceOffered');
      res.body.data.should.have.property('oldPriceOffered');
      res.body.data.newPriceOffered.should.equal(order.newAmount);
      done();
    });
  });
  it('it should not update order price if newAmount  doesnt exisit', function (done) {
    var order = {
      newAmount: ''
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/order/3/price').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('error');
      done();
    });
  });
  it('it should not update order price if car doesnt exisit', function (done) {
    var order = {
      newAmount: 40000
    };

    _chai["default"].request(_index["default"]).patch('/api/v1/order/10/price').set('Authorization', token).send(order).end(function (err, res) {
      res.should.have.status(404);
      res.body.should.be.a('object');
      done();
    });
  });
});