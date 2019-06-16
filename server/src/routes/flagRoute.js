import express from 'express';
import order from '../controllers/flagController';
import Auth from '../middleware/auth';
import method from '../middleware/methods';

const router = express.Router();


// flag car fraudulent
router.route('/flag')
  .post(Auth.verifyUser, order.create)
  .all(method);


export default router;