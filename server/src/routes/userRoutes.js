import express from 'express';
import dotenv from 'dotenv';
import userStructure from '../dStructure/controllers/userController';
import userBase from '../dBase/controllers/userController';
import method from '../middleware/methods';

dotenv.config();

const user = process.env.TYPE === 'db' ? userBase : userStructure;


const router = express.Router();

// sign up new user
router.route('/signup')
  .post(userBase.create)
  .all(method);


/* login exisiting user
router.route('/login')
  .post(user.login)
  .all(method); */


export default router;
