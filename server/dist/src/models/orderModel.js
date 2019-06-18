

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _uuid = _interopRequireDefault(require('uuid'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const Order =
/* #__PURE__ */
(function () {
  function Order() {
    _classCallCheck(this, Order);

    this.orders = [];
  }

  _createClass(Order, [{
    key: 'create',
    value: function create(data) {
      const newOrder = {
        id: data.id || _uuid.default.v4(),
        buyer: data.buyer,
        carId: data.carId,
        amount: data.amount,
        status: data.status || 'pending',
      };
      this.orders.push(newOrder);
      return newOrder;
    },
  }, {
    key: 'findId',
    value: function findId(id) {
      return this.orders.find(order => order.id === id);
    },
  }]);

  return Order;
}());

const _default = new Order();

exports.default = _default;
