"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
      var newId;
      var x = this.orders.length;

      if (x === 0) {
        newId = 1;
      } else {
        newId = this.orders[x - 1].id + 1;
      }

      var newOrder = {
        id: data.id || newId,
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
  }, {
    key: "updatePrice",
    value: function updatePrice(id, amount) {
      var uOrder = this.findId(id);
      uOrder.amount = amount;
    }
  }]);

  return Order;
}();

var _default = new Order();

exports["default"] = _default;