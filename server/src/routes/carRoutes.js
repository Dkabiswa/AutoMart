import express from 'express';
import car from '../controllers/carController';
import auth from '../middleware/auth';
import method from '../middleware/methods';


const router = express.Router();

// get specific car
router.route('/car/:id')
  .get(car.getCar)
  .delete(auth.verifyUser, car.deleteCar)
  .post(auth.verifyUser,  car.imageUpload)
  .all(method);

// return cars in specificed format
router.route('/car')
  .get(auth.verifyUser, car.getUnsold)
  .post(auth.verifyUser, car.create)
  .all(method);


// mark car ad sold
router.route('/car/:id/status')
  .patch(auth.verifyUser, car.mark)
  .all(method);

// update new car price
router.route('/car/:id/price')
  .patch(auth.verifyUser, car.updatePrice)
  .all(method);


export default router;