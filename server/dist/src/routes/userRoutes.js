"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _methods = _interopRequireDefault(require("../middleware/methods"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign up new user


router.route('/signup').post(_userController["default"].create).all(_methods["default"]); // login exisiting user

router.route('/login').post(_userController["default"].login).all(_methods["default"]);
var _default = router;
exports["default"] = _default;