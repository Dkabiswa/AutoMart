import bcrypt from 'bcrypt';
import user from '../models/userModel';
import auth from '../../middleware/auth';
import UserSchema from '../../validations/userValidation';
import Validation from '../../middleware/validationhandler';
import db from '../db/dbControl'


const User = {
  create(req, res, next) {
    const inValid = Validation.validator(req.body, UserSchema.signupSchema);
    if (inValid) {
      return res.status(400).send(notValid);
    }
    const query = `INSERT INTO
      reflections(id, email, first_name, last_name, password, address, is_admin)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.id
      req.body.success,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.address,
      req.body.is_admin
    ];

    try {
      const { rows } = await db.query(query, values);
      return res.status(201).send({
        status:201,
        data: rows[0]
    });
    } catch(error) {
      return res.status(400).send({message: error});
    }
  },
  
};
export default User;
