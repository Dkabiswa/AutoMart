import express from 'express';
import order from '../controllers/orderController';

const router = express.Router();


// create new purchase order
router.post('/order', order.create);

// update new purchase price
router.patch('/order/:id/price', order.updatePrice);


export default router;
