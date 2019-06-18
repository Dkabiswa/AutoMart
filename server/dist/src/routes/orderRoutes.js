

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _express = _interopRequireDefault(require('express'));

const _orderController = _interopRequireDefault(require('../controllers/orderController'));

const _auth = _interopRequireDefault(require('../middleware/auth'));

const _methods = _interopRequireDefault(require('../middleware/methods'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // create new purchase order


router.route('/order').post(_auth.default.verifyUser, _orderController.default.create).all(_methods.default); // update new purchase price

router.route('/order/:id/price').patch(_auth.default.verifyUser, _orderController.default.updatePrice).all(_methods.default);
const _default = router;
exports.default = _default;
