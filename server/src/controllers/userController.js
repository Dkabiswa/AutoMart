import bcrypt from 'bcrypt';
import user from '../models/userModel';
import auth from '../middleware/auth';
import UserSchema from '../validations/userValidation';
import Validation from '../middleware/validationhandler';


const User = {
  create(req, res, next) {
    const notValid = Validation.validator(req.body, UserSchema.signupSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldUser = user.findEmail(req.body.email);
    if (!oldUser) {
      const newUser = user.create(req.body);
      const token = auth.createToken({ id: newUser.id });
      return res.status(201).send({
        status: 201,
        data: {
          Token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    }
    const err = new Error('email already exists');
    err.status = 400;
    next(err);
  },
  login(req, res, next) {
    const notValid = Validation.validator(req.body, UserSchema.loginSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();


    const oldUser = user.findEmail(email);
    if (!oldUser) {
      return res.status(404).send({
        status: 404,
        message: 'email not found pleas signup',
      });
    }
    if (bcrypt.compareSync(req.body.password, oldUser.password)) {
      const token = auth.createToken({ id: oldUser.id });
      return res.status(200).send({
        status: 200,
        data: {
          Token: token,
          id: oldUser.id,
          firstName: oldUser.firstName,
          lastName: oldUser.lastName,
          email: oldUser.email,
        },
      });
    }
    const err = new Error('wrong password ');
    err.status = 404;
    next(err);
  },
};
export default User;

