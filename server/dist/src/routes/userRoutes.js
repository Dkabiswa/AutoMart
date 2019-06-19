

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _userController = _interopRequireDefault(require('../controllers/userController'));

const _methods = _interopRequireDefault(require('../middleware/methods'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // sign up new user


router.route('/signup').post(_userController.default.create).all(_methods.default); // login exisiting user

router.route('/login').post(_userController.default.login).all(_methods.default);
const _default = router;
exports.default = _default;
