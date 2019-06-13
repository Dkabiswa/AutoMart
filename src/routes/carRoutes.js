import express from 'express';
import car from '../controllers/carController';
import auth from '../middleware/auth';

const router = express.Router();

// get specific car
router.get('/car/:id', car.getCar);

// return cars in specificed format
router.get('/car?', auth.verifyUser, car.getUnsold);

// create new car advert car
router.post('/car', auth.verifyUser, car.create);

// mark car ad sold
router.patch('/car/:id/status', auth.verifyUser, car.mark);

// update new car price
router.patch('/car/:id/price', auth.verifyUser, car.updatePrice);

// admin can delete car advert
router.delete('/car/:id', auth.verifyUser, car.deleteCar);

export default router;
