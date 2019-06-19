"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FlagSchema = {
  createSchema: _joi["default"].object().keys({
    id: _joi["default"].number().integer().optional(),
    carId: _joi["default"].number().integer().required(),
    reason: _joi["default"].string().required().regex(/["']?[a-zA-Z][^.?!]+((?![.?!]['"]?\s["']?[a-zA-Z][^.?!]).)+[.?!'"]+/),
    description: _joi["default"].string().required().regex(/["']?[a-zA-Z][^.?!]+((?![.?!]['"]?\s["']?[a-zA-Z][^.?!]).)+[.?!'"]+/)
  })
};
var _default = FlagSchema;
exports["default"] = _default;