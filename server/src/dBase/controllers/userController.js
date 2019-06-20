import bcrypt from 'bcrypt';
import auth from '../../middleware/auth';
import UserSchema from '../../validations/userValidation';
import '@babel/polyfill';
import Validation from '../../middleware/validationhandler';
import UserModel from '../models/userModel';


class User  {
  async create(req, res, next) {
    const inValid = Validation.validator(req.body, UserSchema.signupSchema);
    if (inValid) {
      return res.status(400).send(inValid);
    }
    const { email } = req.body;
    const last_name = req.body.lastName;
    const first_name = req.body.firstName;
    const password = bcrypt.hashSync(req.body.password, 10);
    const { address } = req.body;
    const is_admin = false;

    const values = [
      email,
      last_name,
      first_name,
      password,
      address,
      is_admin,
    ];
    const userExist = await UserModel.checkEmail(email);
    if (userExist.rowCount !== 0) {
      return res.status(409).send({
        status: 409,
        message: 'User already exists',
      });
    }
    const user = await UserModel.createUser(values);
    const newUser = user.rows[0];
    const token = auth.createToken({ id: newUser.id });
    return res.status(201).send({
      status: 201,
      data: {
        Token: token,
        id: newUser.id,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
      },
    });
  }

  async login(req, res, next) {
    const notValid = Validation.validator(req.body, UserSchema.loginSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const { password } = req.body;
    const { email } = req.body;

    const user = await UserModel.checkEmail(email);
    if (user.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }
    const info = user.rows[0];

    if (bcrypt.compareSync(password, info.password)) {
      const token = auth.createToken({ id: info.id });
      return res.status(200).send({
        status: 200,
        data: {
          Token: token,
          id: info.id,
          firstName: info.first_name,
          lastName: info.last_name,
          email: info.email,
        },
      });
    }
    const err = new Error('wrong password ');
    err.status = 401;
    next(err);
  }

  async admin (req, res) {

    const myid = parseInt(req.user.id, 10) 
    const is_admin = req.body.isAdmin;
    const aid = parseInt(req.params.id);

    const user = await UserModel.checkId(aid);
    if (user.rowCount === 0) {
      return res.status(404).send({
          status: 404,
          error: 'USer not found',
        });
    }
    const userAdmin = await UserModel.checkId(myid);
    const values= [
      is_admin,
      aid,
    ];
    if (userAdmin.rows[0].is_admin === true) {
      const response = await UserModel.updateAdmin(values);
      const admin = response.rows[0];
      return res.status(200).json({
        status: 200,
        message: 'Admin changed Sucesfully',
        data: admin,
      });
    }
    
    return res.status(403).send({
      status: 403,
      error: 'you must be an admin',
    });

  }

};
export default new User();
