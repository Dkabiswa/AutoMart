
import car from '../models/carModel';

const Car = {

  getUnsold(req, res) {
    const cars = car.getUnsold(req.query.status);
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

  mark(req, res) {
    const oldCar = car.findId(parseInt(req.params.id));
    if(!oldCar) {
      return res.status(404).send({status: 404 , message: 'car not found' });
    } else {
      oldCar.status = req.body.status;
      return res.status(200).send({ 
        status: 200, 
        data: oldCar
      })
    }
  },
};
export default Car;
