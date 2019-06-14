"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderController = _interopRequireDefault(require("../controllers/orderController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // create new purchase order


router.post('/order', _auth["default"].verifyUser, _orderController["default"].create); // update new purchase price

router.patch('/order/:id/price', _auth["default"].verifyUser, _orderController["default"].updatePrice);
var _default = router;
exports["default"] = _default;