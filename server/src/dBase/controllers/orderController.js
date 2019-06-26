import OrderSchema from '../../validations/orderValidation';
import Validation from '../../middleware/validationhandler';
import CarModel from '../models/carModel'
import UserModel from '../models/userModel';
import '@babel/polyfill';
import OrderModel from '../models/orderModel';

class Order {
  async create(req, res, next) {
    const notValid = Validation.validator(req.body, OrderSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const { buyer } = req.body;
    const car_id = req.body.carId;
    const { amount } = req.body;
    const status = 'pending';
    
    const values = [
      buyer,
      car_id,
      amount,
      status,
    ];

    const user = await UserModel.checkId(buyer);
    if (user.rowCount === 0) {
      return res.status(404).send({
          status: 404,
          message: 'USer not found',
        });
    }

    const car = await CarModel.checkId(car_id);
    if (car.rowCount === 0) {
      return res.status(404).send({
          status: 404,
          message: 'Car not found',
        });
    }
    const neworder = await OrderModel.createOrder(values);
    const created = neworder.rows[0];
    return res.status(201).send({
      status: 201,
      message: 'Order is suceessfully placed',
      data: {
          id: created.id,
          car_id: created.car_id,
          created_on: car.created_on,
          status: created.status,
          price: car.price,
          price_offered: created.amount,
        },
      });
  }

  async updatePrice(req, res) {
    const not_Valid = Validation.validator(req.body, OrderSchema.updateSchema);
    if (not_Valid) {
      return res.status(400).send(not_Valid); 
    }  
    const id = parseInt(req.params.id, 10);
    const ownerId = parseInt(req.user.id, 10) 
    const val = [
      req.body.newAmount,
      id,
    ];
    const order = await OrderModel.checkId(id);
    if (order.rowCount === 0) {
        return res.status(404).send({
          status: 404,
          message: 'Order not found',
        });
    }
    if (ownerId === order.rows[0].buyer){
      const response = await OrderModel.updateOrder(val);
      const newOrder = response.rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          id: newOrder.id,
          car_id: newOrder.car_id,
          status: newOrder.status,
          oldPriceOffered: order.rows[0].amount,
          newPriceOffered: newOrder.amount,
        },
      });
    }
     return res.status(403).send({
          status: 403,
          message: 'you are not the Owner',
        });
  }
};
export default new Order();
