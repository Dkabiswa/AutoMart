import car from '../models/carModel';
import flag from '../models/flagModel';
import FlagSchema from '../validations/flagValidation';
import Validation from '../middleware/validationhandler';

const Flag = {
  create(req, res, next) {
    const notValid = Validation.validator(req.body, FlagSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldCar = car.findId(req.body.carId);
    if (!oldCar) {
      return res.status(404).send('car not found');
    }
    const newFlag = flag.create(req.body);
    return res.status(201).send({
      status: 201,
      data: {
        id: newFlag.id,
        carId: newFlag.carId,
        reason: newFlag.reason,
        description: newFlag.description,
      },
    });
  },
}
export default Flag;