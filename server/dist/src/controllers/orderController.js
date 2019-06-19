

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _carModel = _interopRequireDefault(require('../models/carModel'));

const _orderModel = _interopRequireDefault(require('../models/orderModel'));

const _orderValidation = _interopRequireDefault(require('../validations/orderValidation'));

const _validationhandler = _interopRequireDefault(require('../middleware/validationhandler'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Order = {
  create: function create(req, res, next) {
    const notValid = _validationhandler.default.validator(req.body, _orderValidation.default.createSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldCar = _carModel.default.findId(req.body.carId);

    if (!oldCar) {
      return res.status(404).send('car not found');
    }

    const newOrder = _orderModel.default.create(req.body);

    return res.status(201).send({
      status: 201,
      data: {
        id: newOrder.id,
        carId: newOrder.carId,
        createdOn: oldCar.createdOn,
        status: newOrder.status,
        price: oldCar.price,
        priceOffered: newOrder.amount,
      },
    });
  },
  updatePrice: function updatePrice(req, res, next) {
    const notValid = _validationhandler.default.validator(req.body, _orderValidation.default.updateSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    const purchase = _orderModel.default.findId(parseInt(req.params.id, 10));

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
        newPriceOffered: req.body.newAmount,
      },
    });
  },
};
const _default = Order;
exports.default = _default;
