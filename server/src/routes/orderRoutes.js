import express from 'express';
import order from '../controllers/orderController';
import auth from '../middleware/auth';

const router = express.Router();


// create new purchase order
router.post('/order', auth.verifyUser, order.create);

// update new purchase price
router.patch('/order/:id/price', auth.verifyUser, order.updatePrice);


export default router;
