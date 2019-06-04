import express from 'express';
import user from '../controllers/userController';

const router = express.Router();

// sign up new user
router.post('/signup', user.create);

export default router;
