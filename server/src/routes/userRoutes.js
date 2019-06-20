import express from 'express';
import auth from '../middleware/auth';
import User from '../dBase/controllers/userController';
import method from '../middleware/methods';


const router = express.Router();

// sign up new user
router.route('/signup')
  .post(User.create)
  .all(method);


// login exisiting user
router.route('/login')
  .post(User.login)
  .all(method);

router.route('/admin/:id')
  .patch(auth.verifyUser, User.admin)
  .all(method);
export default router;
