"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carValidation = _interopRequireDefault(require("../../validations/carValidation"));

var _validationhandler = _interopRequireDefault(require("../../middleware/validationhandler"));

var _dbControl = _interopRequireDefault(require("../db/dbControl"));

require("@babel/polyfill");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Car = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var notValid, owner, created_on, state, status, price, manufacturer, model, body_type, text, values, _ref, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              notValid = _validationhandler["default"].validator(req.body, _carValidation["default"].createSchema);

              if (!notValid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send(notValid));

            case 3:
              owner = req.body.owner;
              created_on = (0, _moment["default"])().format('MMMM Do YYYY, h:mm:ss a');
              state = req.body.state;
              status = req.body.status;
              price = req.body.price;
              manufacturer = req.body.manufacturer;
              model = req.body.model;
              body_type = req.body.bodyType;
              text = "INSERT INTO\n      cars(owner, created_on, state, status, price, manufacturer,  model, body_type)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *";
              values = [owner, created_on, state, status, price, manufacturer, model, body_type];
              _context.prev = 13;
              _context.next = 16;
              return _dbControl["default"].query(text, values);

            case 16:
              _ref = _context.sent;
              rows = _ref.rows;
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                message: 'car sucessfully  created',
                data: rows[0]
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](13);
              return _context.abrupt("return", res.status(400).send({
                status: 400,
                error: _context.t0
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[13, 21]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  mark: function () {
    var _mark = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var notValid, text, stext, value, _ref2, rows, response;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notValid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

              if (!notValid) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).send(notValid));

            case 3:
              notValid = _validationhandler["default"].validator(req.body, _carValidation["default"].markSchema);

              if (!notValid) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(400).send(notValid));

            case 6:
              text = 'SELECT * FROM cars WHERE id = $1';
              stext = "UPDATE cars\n      SET status=$1\n      WHERE id=$2 returning *";
              value = [req.body.status, req.params.id];
              _context2.prev = 9;
              _context2.next = 12;
              return _dbControl["default"].query(text, [req.params.id]);

            case 12:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                message: 'car not found'
              }));

            case 16:
              _context2.next = 18;
              return _dbControl["default"].query(stext, value);

            case 18:
              response = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                status: 200,
                data: response.rows[0]
              }));

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](9);
              return _context2.abrupt("return", res.status(400).send({
                status: 400,
                error: _context2.t0
              }));

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[9, 22]]);
    }));

    function mark(_x3, _x4) {
      return _mark.apply(this, arguments);
    }

    return mark;
  }(),
  updatePrice: function () {
    var _updatePrice = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      var text, pricetext, value, _ref3, rows, car;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (req.body.price) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 400,
                message: 'Enter new price to be updated'
              }));

            case 2:
              text = 'SELECT * FROM cars WHERE id = $1';
              pricetext = "UPDATE cars\n      SET price=$1\n      WHERE id=$2 returning *";
              value = [req.body.price, req.params.id];
              _context3.prev = 5;
              _context3.next = 8;
              return _dbControl["default"].query(text, [req.params.id]);

            case 8:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(404).send({
                message: 'car not found'
              }));

            case 12:
              _context3.next = 14;
              return _dbControl["default"].query(pricetext, value);

            case 14:
              car = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                status: 200,
                data: car.rows[0]
              }));

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](5);
              return _context3.abrupt("return", res.status(400).send({
                status: 400,
                error: _context3.t0
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[5, 18]]);
    }));

    function updatePrice(_x5, _x6) {
      return _updatePrice.apply(this, arguments);
    }

    return updatePrice;
  }(),
  getCar: function () {
    var _getCar = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res, next) {
      var xvalid, x, text, _ref4, rows;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              xvalid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

              if (!xvalid) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).send(xvalid));

            case 3:
              x = parseInt(req.params.id);
              text = 'SELECT * FROM cars WHERE id = $1';
              _context4.prev = 5;
              _context4.next = 8;
              return _dbControl["default"].query(text, [x]);

            case 8:
              _ref4 = _context4.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(404).send({
                status: 404,
                message: 'car not found'
              }));

            case 12:
              return _context4.abrupt("return", res.status(200).send({
                status: 200,
                data: rows[0]
              }));

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](5);
              return _context4.abrupt("return", res.status(400).send(_context4.t0));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[5, 15]]);
    }));

    function getCar(_x7, _x8, _x9) {
      return _getCar.apply(this, arguments);
    }

    return getCar;
  }(),
  getUnsold: function () {
    var _getUnsold = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res, next) {
      var options, uValid, min, max, unsold, _ref5, rows, pCar;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              options = req.query;
              uValid = _validationhandler["default"].validator(options, _carValidation["default"].querySchema);

              if (!uValid) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(400).send(uValid));

            case 4:
              min = parseInt(options.minPrice, 10);
              max = parseInt(options.maxPrice, 10);
              unsold = 'SELECT * FROM cars WHERE status = $1';
              _context5.prev = 7;
              _context5.next = 10;
              return _dbControl["default"].query(unsold, [options.status]);

            case 10:
              _ref5 = _context5.sent;
              rows = _ref5.rows;

              if (!(options.minPrice === undefined)) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt("return", res.status(200).send({
                status: 200,
                data: rows
              }));

            case 14:
              if (!(max > min)) {
                _context5.next = 17;
                break;
              }

              pCar = rows.filter(function (p) {
                return p.price >= min && p.price <= max;
              });
              return _context5.abrupt("return", res.status(200).json({
                status: 200,
                data: pCar
              }));

            case 17:
              return _context5.abrupt("return", res.status(400).json({
                status: 400,
                message: 'price range doesnot exisit'
              }));

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](7);
              return _context5.abrupt("return", res.status(400).send({
                status: 400,
                error: _context5.t0
              }));

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[7, 20]]);
    }));

    function getUnsold(_x10, _x11, _x12) {
      return _getUnsold.apply(this, arguments);
    }

    return getUnsold;
  }(),
  allCars: function () {
    var _allCars = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(req, res) {
      var utext, alltext, aCars, user;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              utext = 'SELECT * FROM users WHERE id = $1';
              alltext = 'SELECT * FROM cars';
              _context6.prev = 2;
              _context6.next = 5;
              return _dbControl["default"].query(alltext);

            case 5:
              aCars = _context6.sent;
              _context6.next = 8;
              return _dbControl["default"].query(utext, [req.user.id]);

            case 8:
              user = _context6.sent;

              if (!(user.rows[0].is_admin === true)) {
                _context6.next = 11;
                break;
              }

              return _context6.abrupt("return", res.status(200).send({
                status: 200,
                data: aCars.rows
              }));

            case 11:
              return _context6.abrupt("return", res.status(403).send({
                status: 403,
                message: 'you must be an admin'
              }));

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](2);
              return _context6.abrupt("return", res.status(400).send({
                status: 400,
                error: _context6.t0
              }));

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[2, 14]]);
    }));

    function allCars(_x13, _x14) {
      return _allCars.apply(this, arguments);
    }

    return allCars;
  }(),
  deleteCar: function () {
    var _deleteCar = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(req, res) {
      var dValid, utext, deletetext, i, user, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              dValid = _validationhandler["default"].validator(req.params, _carValidation["default"].carIdSchema);

              if (!dValid) {
                _context7.next = 3;
                break;
              }

              return _context7.abrupt("return", res.status(400).send(dValid));

            case 3:
              utext = 'SELECT * FROM users WHERE id = $1';
              deletetext = 'DELETE FROM cars WHERE id = $1 returning *';
              i = parseInt(req.params.id);
              _context7.prev = 6;
              _context7.next = 9;
              return _dbControl["default"].query(utext, [req.user.id]);

            case 9:
              user = _context7.sent;

              if (!(user.rows[0].is_admin === true)) {
                _context7.next = 18;
                break;
              }

              _context7.next = 13;
              return _dbControl["default"].query(deletetext, [i]);

            case 13:
              _ref6 = _context7.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context7.next = 17;
                break;
              }

              return _context7.abrupt("return", res.status(404).send({
                status: 404,
                message: 'car not found'
              }));

            case 17:
              return _context7.abrupt("return", res.status(200).send({
                status: 200,
                message: 'CarAd sucessfully deleted'
              }));

            case 18:
              return _context7.abrupt("return", res.status(403).send({
                status: 403,
                message: 'you must be an admin'
              }));

            case 21:
              _context7.prev = 21;
              _context7.t0 = _context7["catch"](6);
              return _context7.abrupt("return", res.status(400).send({
                status: 400,
                error: _context7.t0
              }));

            case 24:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[6, 21]]);
    }));

    function deleteCar(_x15, _x16) {
      return _deleteCar.apply(this, arguments);
    }

    return deleteCar;
  }()
};
var _default = Car;
exports["default"] = _default;