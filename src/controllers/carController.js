
import car from '../models/carModel';

const Car = {
  getAll(req, res) {
    const cars = car.getAll();
    return res.status(200).send({status:200, data: cars});
  },

}
export default Car;