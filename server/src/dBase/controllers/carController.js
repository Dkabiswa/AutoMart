import CarSchema from '../../validations/carValidation';
import Validation from '../../middleware/validationhandler';
import db from '../db/dbControl';
import carServices from '../services/carServices';
import '@babel/polyfill';
import moment from 'moment';

const Car = {
  async create(req, res) {
  	const notValid = Validation.validator(req.body, CarSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const { owner } = req.body;
    const created_on = moment().format('MMMM Do YYYY, h:mm:ss a');
    const { state } = req.body;
    const { status } = req.body;
    const { price } = req.body;
    const { manufacturer } = req.body;
    const { model } = req.body;
    const body_type = req.body.bodyType;
    const text = `INSERT INTO
      cars(owner, created_on, state, status, price, manufacturer,  model, body_type)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [
      owner,
      created_on,
      state,
      status,
      price,
      manufacturer,
      model,
      body_type,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        message: 'car sucessfully  created',
      	data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async mark(req, res) {
    let notValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    notValid = Validation.validator(req.body, CarSchema.markSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const text = 'SELECT * FROM cars WHERE id = $1';
    const stext = `UPDATE cars
      SET status=$1
      WHERE id=$2 returning *`;
    const value = [
      req.body.status,
      req.params.id,
    ];

    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'car not found',
        });
      }

      const response = await db.query(stext, value);
      return res.status(200).json({
        status: 200,
        data: response.rows[0],

      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async updatePrice(req, res) {
    if (!req.body.price) {
      return res.status(400).json({ status: 400, message: 'Enter new price to be updated' });
    }
    const text = 'SELECT * FROM cars WHERE id = $1';
    const pricetext = `UPDATE cars
      SET price=$1
      WHERE id=$2 returning *`;
    const value = [
      req.body.price,
      req.params.id,
    ];

    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          message: 'car not found',
        });
      }

      const car = await db.query(pricetext, value);
      return res.status(200).json({
        status: 200,
        data: car.rows[0],

      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getCar(req, res, next) {
    const xvalid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (xvalid) {
      return res.status(400).send(xvalid);
    }
    const x = parseInt(req.params.id);
    const text = 'SELECT * FROM cars WHERE id = $1';
    try {
      const { rows } = await db.query(text, [x]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'car not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async getUnsold(req, res, next) {
    const options = req.query;
    const uValid = Validation.validator(options, CarSchema.querySchema);
    if (uValid) {
      return res.status(400).send(uValid);
    }
    const min = parseInt(options.minPrice, 10);
    const max = parseInt(options.maxPrice, 10);
    const unsold = 'SELECT * FROM cars WHERE status = $1';
    try {
      const { rows } = await db.query(unsold, [options.status]);
      if (options.minPrice === undefined) {
        return res.status(200).send({
          status: 200,
          data: rows,
        });
      }
      if (max > min) {
      const pCar = rows.filter(p => p.price >= min && p.price <= max);

      return res.status(200).json({ status: 200, data: pCar });
      }
      return res.status(400).json({ status: 400, message: 'price range doesnot exisit' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async allCars (req, res) {
    const utext = 'SELECT * FROM users WHERE id = $1';
    const alltext= 'SELECT * FROM cars';
    try {
      const aCars = await db.query(alltext);
      const user = await db.query(utext, [req.user.id]);
       
      if (user.rows[0].is_admin === true) {
        
        return res.status(200).send({
          status: 200,
          data: aCars.rows,
        });
      }
      return res.status(403).send({
        status: 403,
        message: 'you must be an admin',
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
export default Car;
