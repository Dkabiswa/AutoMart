"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _auth = _interopRequireDefault(require("../../middleware/auth"));

var _userValidation = _interopRequireDefault(require("../../validations/userValidation"));

var _validationhandler = _interopRequireDefault(require("../../middleware/validationhandler"));

var _dbControl = _interopRequireDefault(require("../db/dbControl"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res, next) {
      var inValid, email, last_name, first_name, password, address, is_admin, query, values, etext, user, _ref, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              inValid = _validationhandler["default"].validator(req.body, _userValidation["default"].signupSchema);

              if (!inValid) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).send(inValid));

            case 3:
              email = req.body.email;
              last_name = req.body.lastName;
              first_name = req.body.firstName;
              password = _bcrypt["default"].hashSync(req.body.password, 10);
              address = req.body.address;
              is_admin = false;
              query = "INSERT INTO\n      users (email, first_name, last_name, password, address, is_admin)\n      VALUES ($1, $2, $3, $4, $5, $6)\n      returning *";
              values = [email, last_name, first_name, password, address, is_admin];
              etext = 'SELECT * FROM users WHERE email = $1';
              _context.prev = 12;
              _context.next = 15;
              return _dbControl["default"].query(etext, [email]);

            case 15:
              user = _context.sent;

              if (!user.rows[0]) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(400).send({
                status: 400,
                message: 'user already exists'
              }));

            case 18:
              _context.next = 20;
              return _dbControl["default"].query(query, values);

            case 20:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _auth["default"].createToken({
                id: rows[0].id
              });
              return _context.abrupt("return", res.status(201).send({
                status: 201,
                data: {
                  Token: token,
                  id: rows[0].id,
                  firstName: rows[0].first_name,
                  lastName: rows[0].last_name,
                  email: rows[0].email
                }
              }));

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](12);
              return _context.abrupt("return", res.status(400).send({
                message: _context.t0
              }));

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 26]]);
    }));

    function create(_x, _x2, _x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res, next) {
      var notValid, password, email, text, _ref2, rows, token, err;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notValid = _validationhandler["default"].validator(req.body, _userValidation["default"].loginSchema);

              if (!notValid) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(400).send(notValid));

            case 3:
              password = req.body.password;
              email = req.body.email;
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 6;
              _context2.next = 9;
              return _dbControl["default"].query(text, [email]);

            case 9:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt("return", res.status(404).send({
                status: 404,
                message: 'user not found'
              }));

            case 13:
              if (!_bcrypt["default"].compareSync(password, rows[0].password)) {
                _context2.next = 16;
                break;
              }

              token = _auth["default"].createToken({
                id: rows[0].id
              });
              return _context2.abrupt("return", res.status(200).send({
                status: 200,
                data: {
                  Token: token,
                  id: rows[0].id,
                  firstName: rows[0].first_name,
                  lastName: rows[0].last_name,
                  email: rows[0].email
                }
              }));

            case 16:
              err = new Error('wrong password ');
              err.status = 404;
              next(err);
              _context2.next = 24;
              break;

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

    function login(_x4, _x5, _x6) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
var _default = User;
exports["default"] = _default;