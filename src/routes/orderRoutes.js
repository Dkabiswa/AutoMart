import express from 'express';
import order from '../controllers/orderController';

const router = express.Router();


// create new car advert car
router.post('/order', order.create);


export default router;
