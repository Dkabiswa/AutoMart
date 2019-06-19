import car from '../models/carModel';
import flag from '../models/flagModel';
import FlagSchema from '../../validations/flagValidation';
import Validation from '../../middleware/validationhandler';

const Flag = {
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
};
export default Flag;