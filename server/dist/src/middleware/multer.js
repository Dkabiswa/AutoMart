"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataUri = exports.upload = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _datauri = _interopRequireDefault(require("datauri"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].memoryStorage();

var upload = (0, _multer["default"])({
  storage: storage
}).array('image', 6);
exports.upload = upload;
var dUri = new _datauri["default"]();

var dataUri = function dataUri(req) {
  return dUri.format(_path["default"].extname(req.file.originalname).toString(), req.file.buffer);
};

exports.dataUri = dataUri;