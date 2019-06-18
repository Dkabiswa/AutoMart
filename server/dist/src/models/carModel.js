

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _moment = _interopRequireDefault(require('moment'));

const _uuid = _interopRequireDefault(require('uuid'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const Car =
/* #__PURE__ */
(function () {
  function Car() {
    _classCallCheck(this, Car);

    this.cars = [];
  }

  _createClass(Car, [{
    key: 'getAll',
    value: function getAll() {
      return this.cars;
    },
  }, {
    key: 'findId',
    value: function findId(id) {
      return this.cars.find(car => car.id === id);
    },
  }, {
    key: 'getUnsold',
    value: function getUnsold(status) {
      return this.cars.filter(car => car.status === status);
    },
  }, {
    key: 'create',
    value: function create(data) {
      const newCar = {
        id: data.id || _uuid.default.v4(),
        owner: data.owner,
        createdOn: _moment.default.now(),
        state: data.state,
        status: data.status || 'available',
        price: data.price,
        manufacturer: data.manufacturer,
        model: data.model,
        bodyType: data.bodyType,
      };
      this.cars.push(newCar);
      return newCar;
    },
  }, {
    key: 'deleteId',
    value: function deleteId(id) {
      const c = this.findId(id);
      this.cars = this.cars.filter(car => car !== c);
    },
  }]);

  return Car;
}());

const _default = new Car();

exports.default = _default;
