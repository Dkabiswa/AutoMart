"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _userValidation = _interopRequireDefault(require("../validations/userValidation"));

var _validationhandler = _interopRequireDefault(require("../middleware/validationhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = {
  create: function create(req, res, next) {
    var notValid = _validationhandler["default"].validator(req.body, _userValidation["default"].signupSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var oldUser = _userModel["default"].findEmail(req.body.email);

    if (!oldUser) {
      var newUser = _userModel["default"].create(req.body);

      var token = _auth["default"].createToken({
        id: newUser.id
      });

      return res.status(201).send({
        status: 201,
        data: {
          Token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      });
    }

    var err = new Error('email already exists');
    err.status = 400;
    next(err);
  },
  login: function login(req, res, next) {
    var notValid = _validationhandler["default"].validator(req.body, _userValidation["default"].loginSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var password = req.body.password;
    var email = req.body.email.trim().toLowerCase();

    var oldUser = _userModel["default"].findEmail(email);

    if (!oldUser) {
      return res.status(404).send({
        status: 404,
        message: 'email not found pleas signup'
      });
    }

    if (_bcrypt["default"].compareSync(req.body.password, oldUser.password)) {
      var token = _auth["default"].createToken({
        id: oldUser.id
      });

      return res.status(200).send({
        status: 200,
        data: {
          Token: token,
          id: oldUser.id,
          firstName: oldUser.firstName,
          lastName: oldUser.lastName,
          email: oldUser.email
        }
      });
    }

    var err = new Error('wrong password ');
    err.status = 404;
    next(err);
  }
};
var _default = User;
exports["default"] = _default;