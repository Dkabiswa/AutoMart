"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _carController = _interopRequireDefault(require("../controllers/carController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // get specific car


router.get('/car/:id', _carController["default"].getCar); // return cars in specificed format

router.get('/car', _auth["default"].verifyUser, _carController["default"].getUnsold); // create new car advert car

router.post('/car', _auth["default"].verifyUser, _carController["default"].create); // mark car ad sold

router.patch('/car/:id/status', _auth["default"].verifyUser, _carController["default"].mark); // update new car price

router.patch('/car/:id/price', _auth["default"].verifyUser, _carController["default"].updatePrice); // admin can delete car advert

router["delete"]('/car/:id', _auth["default"].verifyUser, _carController["default"].deleteCar);
var _default = router;
exports["default"] = _default;