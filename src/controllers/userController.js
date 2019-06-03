import user from '../models/userModel';

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
      return res.status(201).send({ status: 201, message: 'new user created ', data: newUser });
    }
    return res.status(400).send({ status: 400, message: 'email already exists' });
  },
};
export default User;
