"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carModel = _interopRequireDefault(require("../models/carModel"));

var _orderModel = _interopRequireDefault(require("../models/orderModel"));

var _orderValidation = _interopRequireDefault(require("../validations/orderValidation"));

var _validationhandler = _interopRequireDefault(require("../middleware/validationhandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Order = {
  create: function create(req, res, next) {
    var notValid = _validationhandler["default"].validator(req.body, _orderValidation["default"].createSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var oldCar = _carModel["default"].findId(req.body.carId);

    if (!oldCar) {
      return res.status(404).send('car not found');
    }

    var newOrder = _orderModel["default"].create(req.body);

    return res.status(201).send({
      status: 201,
      data: {
        id: newOrder.id,
        carId: newOrder.carId,
        createdOn: oldCar.createdOn,
        status: newOrder.status,
        price: oldCar.price,
        priceOffered: newOrder.amount
      }
    });
  },
  updatePrice: function updatePrice(req, res, next) {
    var notValid = _validationhandler["default"].validator(req.body, _orderValidation["default"].updateSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    var purchase = _orderModel["default"].findId(parseInt(req.params.id, 10));

    if (!purchase) {
      return res.status(404).send('order not found');
    }

    return res.status(200).json({
      status: 200,
      data: {
        id: purchase.id,
        carId: purchase.carId,
        status: purchase.status,
        oldPriceOffered: purchase.amount,
        newPriceOffered: req.body.newAmount
      }
    });
  }
};
var _default = Order;
exports["default"] = _default;