import express from 'express';
import order from '../dStructure/controllers/orderController';
import Auth from '../middleware/auth';
import method from '../middleware/methods';

const router = express.Router();


// create new purchase order
router.route('/order')
  .post(Auth.verifyUser, order.create)
  .all(method);

// update new purchase price
router.route('/order/:id/price')
  .patch(Auth.verifyUser, order.updatePrice)
  .all(method);


export default router;
