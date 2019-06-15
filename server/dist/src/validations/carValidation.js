"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CarSchema = {
  createSchema: _joi["default"].object().keys({
    id: _joi["default"].number().integer().optional(),
    owner: _joi["default"].number().integer().required(),
    state: _joi["default"].string().valid(['new', 'old']).required(),
    status: _joi["default"].string()["default"]('available').regex(/^[A-Za-z]+$/),
    price: _joi["default"].number().required(),
    manufacturer: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
    model: _joi["default"].string().required().regex(/^[A-Za-z]+$/),
    bodyType: _joi["default"].string().required().regex(/^[A-Za-z]+$/)
  }),
  carIdSchema: _joi["default"].object().keys({
    id: _joi["default"].number().integer().min(0).required()
  }),
  querySchema: _joi["default"].object().keys({
    status: _joi["default"].string().valid(['available']).required(),
    minPrice: _joi["default"].number(),
    maxPrice: _joi["default"].number()
  }),
  markSchema: _joi["default"].object().keys({
    status: _joi["default"].string().valid('sold').required()
  })
};
var _default = CarSchema;
exports["default"] = _default;