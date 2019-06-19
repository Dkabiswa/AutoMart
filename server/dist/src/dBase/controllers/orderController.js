"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderValidation = _interopRequireDefault(require("../../validations/orderValidation"));

var _validationhandler = _interopRequireDefault(require("../../middleware/validationhandler"));

var _dbControl = _interopRequireDefault(require("../db/dbControl"));

var _database = _interopRequireDefault(require("../database"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var notValid, text, buyer, car_id, amount, status, query, values, car, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              notValid = _validationhandler["default"].validator(req.body, _orderValidation["default"].createSchema);

              if (!notValid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send(notValid));

            case 3:
              text = 'SELECT * FROM cars WHERE id = $1';
              buyer = req.body.buyer;
              car_id = req.body.carId;
              amount = req.body.amount;
              status = 'pending';
              query = "INSERT INTO\n      orders (buyer, car_id, amount, status)\n      VALUES ($1, $2, $3, $4)\n      returning *";
              values = [buyer, car_id, amount, status];
              _context.prev = 10;
              _context.next = 13;
              return _dbControl["default"].query(text, [car_id]);

            case 13:
              car = _context.sent;

              if (car.rows[0]) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                message: 'car not found'
              }));

            case 16:
              _context.next = 18;
              return _dbControl["default"].query(query, values);

            case 18:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: {
                  id: rows[0].id,
                  car_id: rows[0].car_id,
                  created_on: car.created_on,
                  status: rows[0].status,
                  price: car.price,
                  price_offered: rows[0].amount
                }
              }));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](10);
              return _context.abrupt("return", res.status(400).send({
                message: _context.t0
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 23]]);
    }));

    function create(_x, _x2, _x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  updatePrice: function () {
    var _updatePrice = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var not_Valid, text, pricetext, val, _ref2, rows, old, change, newOrder;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              not_Valid = _validationhandler["default"].validator(req.body, _orderValidation["default"].updateSchema);

              if (!not_Valid) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).send(not_Valid));

            case 3:
              text = 'SELECT * FROM orders WHERE id = $1';
              pricetext = "UPDATE orders\n      SET amount=$1\n      WHERE id=$2 returning *";
              val = [req.body.newAmount, req.params.id];
              _context2.prev = 6;
              _context2.next = 9;
              return _dbControl["default"].query(text, [req.params.id]);

            case 9:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              old = rows[0];

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'order not found'
              }));

            case 14:
              _context2.next = 16;
              return _dbControl["default"].query(pricetext, val);

            case 16:
              change = _context2.sent;
              newOrder = change.rows[0];
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: {
                  id: old.id,
                  car_id: old.car_id,
                  status: old.status,
                  oldPriceOffered: old.amount,
                  newPriceOffered: newOrder.amount
                }
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](6);
              return _context2.abrupt("return", res.status(400).send(_context2.t0));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 21]]);
    }));

    function updatePrice(_x4, _x5, _x6) {
      return _updatePrice.apply(this, arguments);
    }

    return updatePrice;
  }()
};
var _default = Order;
exports["default"] = _default;