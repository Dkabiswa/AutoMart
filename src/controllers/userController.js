import user from '../models/userModel';
import bcrypt from 'bcrypt';
import auth from '../auth/local';

const User = {
  create(req, res) {
    if (
      !req.body.email
      || !req.body.firstName
      || !req.body.lastName
      || !req.body.password
      || !req.body.address) {
      return res.status(400).send({ status: 400, message: 'email, firstName, lastName, password, address are required' });
    }
    const oldUser = user.findEmail(req.body.email);
    if (!oldUser) {
      const newUser = user.create(req.body);
      const token = auth.createToken(newUser.id);
      return res.status(201).send({
        status: 201,
        data: {
          Token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: newUser.password
        },
      });
    }
    return res.status(400).send({ status: 400, message: 'email already exists' });
  },
  login(req, res) {
    const password = req.body.password;
    const email = req.body.email.trim().toLowerCase();
    if (
      !password
      || !email) {
      return res.status(400).send({status: 400, message : 'Both password and email fields are required'});
    }

    const oldUser = user.findEmail(email);
    if(!oldUser){
      return res.status(404).send({status: 404, message: 'User not found please SignUp'});
    } else {
      if(bcrypt.compareSync(password, oldUser.password)) {
        const token = auth.createToken(oldUser.id);
        return res.status(200).send({
          status: 200,
          data: {
            Token: token,
            id: oldUser.id,
            firstName: oldUser.firstName,
            lastName: oldUser.lastName,
            email: oldUser.email
          },
        })
      } else {
        return res.status(400).send({status: 400, message: 'wrong password or email'});
      }
    }
  }
};
export default User;
