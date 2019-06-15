"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _carRoutes = _interopRequireDefault(require("./src/routes/carRoutes"));

var _userRoutes = _interopRequireDefault(require("./src/routes/userRoutes"));

var _orderRoutes = _interopRequireDefault(require("./src/routes/orderRoutes"));

var _methods = _interopRequireDefault(require("./src/middleware/methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
var route = '/';
app.get(route, function (req, res) {
  res.status(200).json({
    status: 200,
    message: 'WELCOME, THIS IS AUTOMART'
  });
});
app.all(route, _methods["default"]);
app.use('/api/v1', _carRoutes["default"]);
app.use('/api/v1/auth', _userRoutes["default"]);
app.use('/api/v1', _orderRoutes["default"]);
app.use(function (req, res, next) {
  var err = new Error('Invalid URL');
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  var status = err.status || 500;
  return res.status(status).send({
    status: status,
    message: err.message
  });
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log("App running on port ".concat(port));
});
var _default = server;
exports["default"] = _default;