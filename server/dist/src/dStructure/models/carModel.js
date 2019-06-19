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

var Car =
/*#__PURE__*/
function () {
  function Car() {
    _classCallCheck(this, Car);

    this.cars = [];
  }

  _createClass(Car, [{
    key: "getAll",
    value: function getAll() {
      return this.cars;
    }
  }, {
    key: "findId",
    value: function findId(id) {
      return this.cars.find(function (car) {
        return car.id === id;
      });
    }
  }, {
    key: "getUnsold",
    value: function getUnsold(status) {
      return this.cars.filter(function (car) {
        return car.status === status;
      });
    }
  }, {
    key: "getState",
    value: function getState(status, state) {
      var aCars = this.getUnsold(status);
      return aCars.filter(function (car) {
        return car.state === state;
      });
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(id, price) {
      var pCar = this.findId(id);
      pCar.price = price;
    }
  }, {
    key: "getMake",
    value: function getMake(status, manufacturer) {
      var aCars = this.getUnsold(status);
      return aCars.filter(function (car) {
        return car.manufacturer === manufacturer;
      });
    }
  }, {
    key: "addImages",
    value: function addImages(id, images) {
      var c = this.findId(id);
      c.images = images;
    }
  }, {
    key: "getBody",
    value: function getBody(body) {
      return this.cars.filter(function (car) {
        return car.bodyType === body;
      });
    }
  }, {
    key: "create",
    value: function create(data) {
      var newId;
      var x = this.cars.length;

      if (x === 0) {
        newId = 1;
      } else {
        newId = this.cars[x - 1].id + 1;
      }

      var newCar = {
        id: data.id || newId,
        owner: data.owner,
        createdOn: _moment["default"].now(),
        state: data.state,
        status: data.status || 'available',
        price: data.price,
        manufacturer: data.manufacturer,
        model: data.model,
        bodyType: data.bodyType
      };
      this.cars.push(newCar);
      return newCar;
    }
  }, {
    key: "deleteId",
    value: function deleteId(id) {
      var c = this.findId(id);
      this.cars = this.cars.filter(function (car) {
        return car !== c;
      });
    }
  }]);

  return Car;
}();

var _default = new Car();

exports["default"] = _default;