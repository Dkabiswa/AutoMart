import express from 'express';
import car from '../controllers/carController';

const router = express.Router();

// get all unsold cars
router.get('/car', car.getUnsold);

// create new car advert car
router.post('/car', car.create);

// mark car ad sold
router.patch('/car/:id/status', car.mark);

export default router;
