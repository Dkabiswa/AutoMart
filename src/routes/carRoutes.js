import express from 'express';
import car from '../controllers/carController';

const router = express.Router();

// get all unsold cars
router.get('/cars', car.getAll);

// create new car advert car
router.post('/cars', car.create);

export default router;
