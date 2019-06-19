import FlagSchema from '../../validations/flagValidation';
import Validation from '../../middleware/validationhandler';
import moment from 'moment';
import db from '../db/dbControl';

const Flag = {
  async create(req, res, next) {
    const fValid = Validation.validator(req.body, FlagSchema.createSchema);
    if (fValid) {
      return res.status(400).send({
        status: 400,
        message: fValid 
      });  
    }
    const text = 'SELECT * FROM cars WHERE id = $1';

    const car_id = req.body.carId;
    const created_on = moment().format('MMMM Do YYYY, h:mm:ss a');
    const { reason } = req.body;
    const { description } = req.body;
    const query = `INSERT INTO
      flags (car_id, created_on, reason, description)
      VALUES ($1, $2, $3, $4)
      returning *`;
    const values = [
      car_id,
      created_on,
      reason,
      description,
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
        data: rows[0]
      });
    } catch (error) {
      return res.status(400).send({
      status:400,
      message: error 
     });
    }
  },
};
export default Flag;