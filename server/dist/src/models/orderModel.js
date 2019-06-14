"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);

    this.orders = [];
  }

  _createClass(Order, [{
    key: "create",
    value: function create(data) {
      var newOrder = {
        id: data.id || _uuid["default"].v4(),
        buyer: data.buyer,
        carId: data.carId,
        amount: data.amount,
        status: data.status || 'pending'
      };
      this.orders.push(newOrder);
      return newOrder;
    }
  }, {
    key: "findId",
    value: function findId(id) {
      return this.orders.find(function (order) {
        return order.id === id;
      });
    }
  }]);

  return Order;
}();

var _default = new Order();

exports["default"] = _default;