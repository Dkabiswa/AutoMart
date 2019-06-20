import FlagSchema from '../../validations/flagValidation';
import Validation from '../../middleware/validationhandler';
import moment from 'moment';
import '@babel/polyfill';
import CarModel from '../models/carModel'
import FlagModel from '../models/flagModel'

class Flag {
  async create(req, res, next) {
    const fValid = Validation.validator(req.body, FlagSchema.createSchema);
    if (fValid) {
      return res.status(400).send({
        status: 400,
        message: fValid 
      });  
    }

    const car_id = req.body.carId;
    const created_on = moment().format('MMMM Do YYYY, h:mm:ss a');
    const { reason } = req.body;
    const { description } = req.body;
    const values = [
      car_id,
      created_on,
      reason,
      description,
    ];
    const car = await CarModel.checkId(car_id);
    if (car.rowCount === 0) {
      return res.status(404).send({
          status: 404,
          message: 'Car not found',
        });
    }
    const flag = await FlagModel.createFlag(values);
    const newflag = flag.rows[0];
    return res.status(201).send({
        status: 201,
        message: 'Car sucessfully reported',
        data: newflag
      });
  }
};
export default new Flag();