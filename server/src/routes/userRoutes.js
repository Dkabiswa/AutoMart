import express from 'express';
import dotenv from 'dotenv';
import User from '../dBase/controllers/userController';
import method from '../middleware/methods';

dotenv.config();


const router = express.Router();

// sign up new user
router.route('/signup')
  .post(User.create)
  .all(method);


// login exisiting user
router.route('/login')
  .post(User.login)
  .all(method);


export default router;
