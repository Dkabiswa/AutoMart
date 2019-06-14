"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Validation = {
  validator: function validator(body, schema) {
    var _Joi$validate = _joi["default"].validate(body, schema),
        error = _Joi$validate.error;

    if (error) {
      var response = {
        stautus: 400,
        error: error.details[0].message
      };
      return response;
    }
  }
};
var _default = Validation;
exports["default"] = _default;