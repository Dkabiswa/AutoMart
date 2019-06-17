import car from '../models/carModel';
import order from '../models/orderModel';
import OrderSchema from '../../validations/orderValidation';
import Validation from '../../middleware/validationhandler';

const Order = {
  create(req, res, next) {
    const notValid = Validation.validator(req.body, OrderSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldCar = car.findId(req.body.carId);
    if (!oldCar) {
      return res.status(404).send('car not found');
    }
    const newOrder = order.create(req.body);
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
  updatePrice(req, res, next) {
    const notValid = Validation.validator(req.body, OrderSchema.updateSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    let y =parseInt(req.params.id, 10);
    const purchase = order.findId(y);
    if (!purchase) {
      return res.status(404).send('order not found');
    } 
    order.updatePrice(y, req.body.newAmount);
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
export default Order;
