import express from 'express';
import user from '../controllers/userController';

const router = express.Router();

// sign up new user
router.post('/signup', user.create);


// login exisiting user
router.post('/login', user.login);


export default router;
