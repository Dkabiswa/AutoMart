
import car from '../models/carModel';

const Car = {

  getAll(req, res) {
    const cars = car.getAll();
    return res.status(200).json({ status: 200, data: cars });
  },

  create(req, res) {
    if (
      !req.body.owner
      || !req.body.state
      || !req.body.price
      || !req.body.manufacturer
      || !req.body.model
      || !req.body.bodyType) {
      return res.status(400).json({ status: 400, message: 'owner, state, price, manufacturer, model, bodyType are required' });
    }
    const newCar = car.create(req.body);
    return res.status(201).send({ status: 201, data: newCar });
  },
};
export default Car;
