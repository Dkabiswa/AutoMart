import express from 'express';
import user from '../controllers/userController';
import method from '../middleware/methods';

const router = express.Router();

// sign up new user
router.route('/signup')
  .post(user.create)
  .all(method);


// login exisiting user
router.route('/login')
  .post(user.login)
  .all(method);


export default router;
