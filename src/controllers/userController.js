import user from '../models/userModel';
import auth from '../auth/local'

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
      return res.status(201).send({ status: 201, message: 'new user created ', Token: token });
    }
    return res.status(400).send({ status: 400, message: 'email already exists' });
  },
};
export default User;
