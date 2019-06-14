"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // sign up new user


router.post('/signup', _userController["default"].create); // login exisiting user

router.post('/login', _userController["default"].login);
var _default = router;
exports["default"] = _default;