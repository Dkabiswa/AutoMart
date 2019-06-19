"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Flag =
/*#__PURE__*/
function () {
  function Flag() {
    _classCallCheck(this, Flag);

    this.flags = [];
  }

  _createClass(Flag, [{
    key: "create",
    value: function create(data) {
      var newId;
      var x = this.flags.length;

      if (x === 0) {
        newId = 1;
      } else {
        newId = this.flags[x - 1].id + 1;
      }

      var newFlag = {
        id: data.id || newId,
        carId: data.carId,
        createdOn: _moment["default"].now(),
        reason: data.reason,
        description: data.description
      };
      this.flags.push(newFlag);
      return newFlag;
    }
  }]);

  return Flag;
}();

var _default = new Flag();

exports["default"] = _default;