

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _carController = _interopRequireDefault(require('../controllers/carController'));

const _auth = _interopRequireDefault(require('../middleware/auth'));

const _methods = _interopRequireDefault(require('../middleware/methods'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // get specific car


router.route('/car/:id').get(_carController.default.getCar).delete(_auth.default.verifyUser, _carController.default.deleteCar).all(_methods.default); // return cars in specificed format

router.route('/car').get(_auth.default.verifyUser, _carController.default.getUnsold).post(_auth.default.verifyUser, _carController.default.create).all(_methods.default); // mark car ad sold

router.route('/car/:id/status').patch(_auth.default.verifyUser, _carController.default.mark).all(_methods.default); // update new car price

router.route('/car/:id/price').patch(_auth.default.verifyUser, _carController.default.updatePrice).all(_methods.default);
const _default = router;
exports.default = _default;
