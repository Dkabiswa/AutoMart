import OrderSchema from '../../validations/orderValidation';
import Validation from '../../middleware/validationhandler';
import db from '../db/dbControl';
import datab from '../database'
import carServices from '../services/carServices'
import '@babel/polyfill';

const Order = {
  async create(req, res, next) {
    const notValid = Validation.validator(req.body, OrderSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const car = carServices.getOne(car_id);
    
    const { buyer } = req.body;
    const  car_id  = req.body.carId;
    const { amount } = req.body;
    const status = 'pending'
    const query = `INSERT INTO
      orders (buyer, car_id, amount, status)
      VALUES ($1, $2, $3, $4)
      returning *`;
    const values = [
      buyer,
      car_id,
      amount,
      status,
    ];

    try {
      const { rows } = await db.query(query, values);      
      return res.status(201).send({
        status: 201,
        data: {
          id: rows[0].id,
          car_id: rows[0].car_id,
          created_on: car.created_on,
          status: rows[0].status,
          price: car.price,
          price_offered: rows[0].amount
        }
      });

    } catch (error) {
      return res.status(400).send({ message: error });
    }
  },
 }
 export default Order;