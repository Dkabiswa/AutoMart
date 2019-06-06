import car from '../models/carModel';
import order from '../models/orderModel';

const Order = {
  create(req, res) {
    if (
      !req.body.buyer
      || !req.body.carId
      || !req.body.amount) {
      return res.status(400).json({ status: 400, message: 'buyer, carId, amount,fields are required' });
    }
    const oldCar = car.findId(parseInt(req.body.carId));
    if (!oldCar) {
      return res.status(404).json({ status: 404, message: 'car not found' });
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
};
export default Order;
