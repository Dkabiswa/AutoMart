import express from 'express';
import car from '../controllers/carController';
import auth from '../auth/local';

const router = express.Router();

// get specific car
router.get('/car/:id', car.getCar);

// get all unsold cars within price range
router.get('/car?', auth.verifyUser, car.getUnsold);


// create new car advert car
router.post('/car', car.create);

// mark car ad sold
router.patch('/car/:id/status', car.mark);

// update new car price
router.patch('/car/:id/price', car.updatePrice);

export default router;
