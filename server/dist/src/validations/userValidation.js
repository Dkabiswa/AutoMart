"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = {
  loginSchema: _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  }),
  signupSchema: _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    firstName: _joi["default"].string().min(3).max(20).required().regex(/^[A-Za-z]+$/),
    lastName: _joi["default"].string().min(3).max(20).required().regex(/^[A-Za-z]+$/),
    password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    address: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
    isAdmin: _joi["default"].bool()
  })
};
var _default = UserSchema;
exports["default"] = _default;