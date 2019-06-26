import moment from 'moment';
import CarSchema from '../../validations/carValidation';
import Validation from '../../middleware/validationhandler';
import CarModel from '../models/carModel';
import '@babel/polyfill';
import UserModel from '../models/userModel';

class Car {
  async create(req, res) {
  	const notValid = Validation.validator(req.body, CarSchema.createSchema);
    if (notValid) {
      return res.status(400).send({
        status: 400,
        message: notValid,
      });
    }

    const { owner } = req.body;
    const created_on = moment().format('MMMM Do YYYY, h:mm:ss a');
    const { state } = req.body;
    const { status } = req.body;
    const { price } = req.body;
    const { manufacturer } = req.body;
    const { model } = req.body;
    const body_type = req.body.bodyType;

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

  const user = await UserModel.checkId(owner);
    if (user.rowCount === 0) {
      return res.status(404).send({
          status: 404,
          message: 'USer not found',
        });
    }
    const car = await CarModel.createCar(values);
    return res.status(201).send({
      status: 201,
      message: 'car sucessfully  created',
      	data: car.rows[0],
    });
  }

  async mark(req, res) {
    let notValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (notValid) {
      return res.status(400).send({
        status: 400,
        message: notValid,
      });
    }
    notValid = Validation.validator(req.body, CarSchema.markSchema);
    if (notValid) {
      return res.status(400).send({
        status: 400,
        message: notValid,
      });
    }
    const mid = parseInt(req.user.id, 10) 
    const id = parseInt(req.params.id, 10);
    const value = [
      req.body.status,
      id,
    ];

    const oCar = await CarModel.checkId(id);
    if (oCar.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        message: 'Car not found',
      });
    }
    if(mid === oCar.rows[0].owner){
      const response = await CarModel.markSold(value);
      return res.status(200).json({
        status: 200,
        message: 'Car is now Sold',
        data: response.rows[0],
      });
    }
    return res.status(403).send({
      status: 403,
      message: 'You do not own this car',
    });
  }

  async updatePrice(req, res) {
    if (!req.body.price) {
      return res.status(400).json({ status: 400, message: 'Enter new price to be updated' });
    }
    const d = parseInt(req.params.id, 10);
    const uid = parseInt(req.user.id, 10);
    const value = [
      req.body.price,
      d,
    ];
    const uCar = await CarModel.checkId(d);
    if (uCar.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        message: 'Car not found',
      });
    }
    if(uid === uCar.rows[0].owner){
      const change = await CarModel.updatePrice(value);
      return res.status(200).json({
        status: 200,
        message: 'Price sucessfully updated',
        data: change.rows[0],
      });
    }
    return res.status(403).send({
      status: 403,
      message: 'You do not own this car',
    });
  }
  async getCar(req, res) {
    const xvalid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (xvalid) {
      return res.status(400).send(xvalid);
    }
    const x = parseInt(req.params.id, 10);
    const gCar = await CarModel.checkId(x);
    if (gCar.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        message: 'Car not found',
      });
    }
    return res.status(200).send({
      status: 200,
      message: 'Vehicle sucessfully returned',
      data: gCar.rows[0],
    });
  }

  async getUnsold(req, res, next) {
    const options = req.query;
    const uValid = Validation.validator(options, CarSchema.querySchema);
    if (uValid) {
      return res.status(400).send(uValid);
    }
    const min = parseInt(options.minPrice, 10);
    const max = parseInt(options.maxPrice, 10);

    const unsold = await CarModel.unSold([options.status]);

    if (options.minPrice === undefined) {
      return res.status(200).send({
        status: 200,
        message: 'List of available cars',
        data: unsold.rows,
      });
    }
    if (max > min) {
      const pCar = unsold.rows.filter(p => p.price >= min && p.price <= max);

      return res.status(200).json({
        status: 200,
        message: 'Cars in specified range',
        data: pCar,
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'price range doesnot exisit',
    });
  }

  async allCars(req, res) {
    const aCars = await CarModel.allCars(); 
    const uid = parseInt(req.user.id, 10)
    const user = await UserModel.checkId(uid);

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
  }

  async deleteCar(req, res) {
    const dValid = Validation.validator(req.params, CarSchema.carIdSchema);
    if (dValid) {
      return res.status(400).send(dValid);
    }
    const did = parseInt(req.user.id, 10) 
    const userAdmin = await UserModel.checkId(did);
    const i = parseInt(req.params.id, 10);

    if (userAdmin.rows[0].is_admin === true) {
      const deleted = await CarModel.deleteCar([i]);
      if (!deleted.rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'car not found',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'CarAd sucessfully deleted',
      });
    }
    return res.status(403).send({
      status: 403,
      message: 'you must be an admin',
    });
  }
};
export default new Car();
