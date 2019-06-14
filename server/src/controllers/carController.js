import users from '../models/userModel';
import car from '../models/carModel';
import CarSchema from '../validations/carValidation';
import Validation from '../middleware/validationhandler';

const Car = {
  getUnsold(req, res) {
    const options = req.query;
    // if no query is passed return all cars
    if (options === undefined || Object.keys(options).length === 0) {
      const user = users.findId(req.user.id);


      // check if user is admin
      if (user.isAdmin === true) {
        const aCars = car.getAll();
        return res.status(200).send({
          status: 200,
          data: aCars,
        });
      }
      return res.status(403).send({
        status: 403,
        message: 'you must be an admin',
      });
    }
    const notValid = Validation.validator(options, CarSchema.querySchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const min = parseInt(options.minPrice, 10);
    const max = parseInt(options.maxPrice, 10);
    const cars = car.getUnsold(options.status);
    // return unsold cars
    if (options.status && options.minPrice === undefined) {
      return res.status(200).json({ status: 200, data: cars });
    }
    // return cars in a price range
    if (max > min) {
      const pCar = cars.filter(p => p.price >= min && p.price <= max);

      return res.status(200).json({ status: 200, data: pCar });
    }
    return res.status(400).json({ status: 400, message: 'price range doesnot exisit' });
  },

  getCar(req, res, next) {
    const notValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const oldCar = car.findId(parseInt(req.params.id, 10));
    if (!oldCar) {
      const err = new Error('car not found');
      err.status = 404;
      next(err);
    }

    return res.status(200).json({ status: 200, data: oldCar });
  },

  create(req, res) {
    const notValid = Validation.validator(req.body, CarSchema.createSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const newCar = car.create(req.body);
    return res.status(201).send({ status: 201, data: newCar });
  },
  deleteCar(req, res) {
    const notValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    const user = users.findId(req.user.id);
    // check if user is admin
    if (user.isAdmin === true) {
      const oldCar = car.findId(parseInt(req.params.id, 10));
      if (!oldCar) {
        return res.status(404).send({ status: 404, message: 'car not found' });
      }
      car.deleteId(parseInt(req.params.id, 10));
      return res.status(200).send({
        status: 200,
        message: 'CarAd sucessfully deleted',
      });
    }
    return res.status(403).send({
      status: 403,
      message: 'you must be an admin',
    });
  },

  mark(req, res) {
    let notValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }
    notValid = Validation.validator(req.body, CarSchema.markSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldCar = car.findId(parseInt(req.params.id, 10));
    if (!oldCar) {
      return res.status(404).send({ status: 404, message: 'car not found' });
    }
    oldCar.status = req.body.status;
    return res.status(200).send({
      status: 200,
      data: oldCar,
    });
  },
  updatePrice(req, res) {
    if (!req.body.price) {
      return res.status(400).json({ status: 400, message: 'Enter new price to be updated' });
    }
    const oldCar = car.findId(parseInt(req.params.id, 10));
    if (!oldCar) {
      return res.status(404).json({ status: 404, message: 'car not found' });
    }
    oldCar.price = req.body.price;
    return res.status(200).json({
      status: 200,
      data: oldCar,
    });
  },
};
export default Car;
