

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _bodyParser = _interopRequireDefault(require('body-parser'));

const _carRoutes = _interopRequireDefault(require('./src/routes/carRoutes'));

const _userRoutes = _interopRequireDefault(require('./src/routes/userRoutes'));

const _orderRoutes = _interopRequireDefault(require('./src/routes/orderRoutes'));

const _methods = _interopRequireDefault(require('./src/middleware/methods'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false,
}));
app.use(_bodyParser.default.json());
const route = '/';
app.get(route, (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'WELCOME, THIS IS AUTOMART',
  });
});
app.all(route, _methods.default);
app.use('/api/v1', _carRoutes.default);
app.use('/api/v1/auth', _userRoutes.default);
app.use('/api/v1', _orderRoutes.default);
app.use((req, res, next) => {
  const err = new Error('Invalid URL');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).send({
    status,
    message: err.message,
  });
});
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running on port '.concat(port));
});
const _default = server;
exports.default = _default;
