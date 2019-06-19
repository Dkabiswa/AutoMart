import OrderSchema from '../../validations/orderValidation';
import Validation from '../../middleware/validationhandler';
import db from '../db/dbControl';
import datab from '../database';
import '@babel/polyfill';

const Order = {
  async create(req, res, next) {
    const notValid = Validation.validator(req.body, OrderSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const text = 'SELECT * FROM cars WHERE id = $1';


    const { buyer } = req.body;
    const car_id = req.body.carId;
    const { amount } = req.body;
    const status = 'pending';
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
      const car = await db.query(text, [car_id]);
      if (!car.rows[0]) {
        return res.status(404).send({
          message: 'car not found',
        });
      }
      const { rows } = await db.query(query, values);
      return res.status(201).send({
        status: 201,
        data: {
          id: rows[0].id,
          car_id: rows[0].car_id,
          created_on: car.created_on,
          status: rows[0].status,
          price: car.price,
          price_offered: rows[0].amount,
        },
      });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  },

  async updatePrice(req, res, next) {
    const not_Valid = Validation.validator(req.body, OrderSchema.updateSchema);
    if (not_Valid) {
      return res.status(400).send(not_Valid);
    }

    const text = 'SELECT * FROM orders WHERE id = $1';
    const pricetext = `UPDATE orders
      SET amount=$1
      WHERE id=$2 returning *`;
    const val = [
      req.body.newAmount,
      req.params.id,
    ];

    try {
      const { rows } = await db.query(text, [req.params.id]);
      const old = rows[0];
      if (!rows[0]) {
        return res.status(404).send({
          message: 'order not found',
        });
      }

      const change = await db.query(pricetext, val);
      const newOrder = change.rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          id: old.id,
          car_id: old.car_id,
          status: old.status,
          oldPriceOffered: old.amount,
          newPriceOffered: newOrder.amount,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
export default Order;
