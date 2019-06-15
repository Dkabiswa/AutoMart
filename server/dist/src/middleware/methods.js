"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var method = function method(req, res) {
  return res.status(405).send({
    status: 405,
    message: 'method not allowed'
  });
};

var _default = method;
exports["default"] = _default;