import bcrypt from 'bcrypt';
import auth from '../../middleware/auth';
import UserSchema from '../../validations/userValidation';
import Validation from '../../middleware/validationhandler';
import db from '../db/dbControl';
import '@babel/polyfill';


const User = {
  async create(req, res, next) {
    const inValid = Validation.validator(req.body, UserSchema.signupSchema);
    if (inValid) {
      return res.status(400).send(inValid);
    }
    const { email } = req.body;
    const last_name = req.body.lastName;
    const first_name = req.body.firstName;
    const  password  = bcrypt.hashSync(req.body.password, 10);
    const { address } = req.body;
    const is_admin = req.body.isAdmin;
    const query = `INSERT INTO
      users (email, first_name, last_name, password, address, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      email,
      last_name,
      first_name,
      password,
      address,
      is_admin,
    ];

    try {
      const { rows } = await db.query(query, values);
      const token = auth.createToken({ id: rows[0].id });
      return res.status(201).send({
        status: 201,
        data: {
          Token: token,
          id: rows[0].id,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
        },
      });
    } catch (error) {
      return res.status(400).send({ message: error.detail });
    }
  },
  
  async login(req, res, next) {
    const notValid = Validation.validator(req.body, UserSchema.loginSchema);
    if (notValid) {
      return res.status(400).send(notValid);
    }

    const { password } = req.body;
    const { email } = req.body;

    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, email);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'reflection not found'
        });
      }
      if (bcrypt.compareSync(password, rows[0].password)) {
        const token = auth.createToken({ id: rows[0].id });
        return res.status(200).send({
        status: 200,
        data: {
          Token: token,
          id: rows[0].id,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
        },
      });
    }
    const err = new Error('wrong password ');
    err.status = 404;
    next(err);
    } catch(error) {
      return res.status(400).send(error)
    }
  },

};
export default User;
