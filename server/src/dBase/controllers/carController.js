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
    const pricetext = `UPDATE cars
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

      const response = await db.query(pricetext, value);
      return res.status(200).json({
        status: 200,
        data: response.rows[0],

      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

};
export default Car;
