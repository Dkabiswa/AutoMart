

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

const _dotenv = _interopRequireDefault(require('dotenv'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const Auth = {
  createToken: function createToken(_ref) {
    const { id } = _ref;
    const expiresIn = 24 * 60 * 60;
    return _jsonwebtoken.default.sign({
      id,
    }, process.env.SECRET_KEY, {
      expiresIn,
    });
  },
  verifyUser: function verifyUser(req, res, next) {
    try {
      const header = req.headers.authorization;

      if (header === undefined) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized',
        });
      }

      req.user = _jsonwebtoken.default.verify(header, process.env.SECRET_KEY);
      next();
    } catch (err) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid token!',
      });
    }

    return false;
  },
};
const _default = Auth;
exports.default = _default;
