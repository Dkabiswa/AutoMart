import express from 'express';
import car from '../controllers/carController';
const router = express.Router();

//get all unsold cars
router.get('/cars', car.getAll);


export default router;