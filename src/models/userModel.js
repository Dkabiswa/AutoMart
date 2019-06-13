import uuid from 'uuid';
import bcrypt from 'bcrypt';

class User {
  constructor() {
    this.users = [];
  }

  findId(id) {
    return this.users.find(user => user.id === id);
  }

  findEmail(email) {
    return this.users.find(user => user.email === email);
  }

  create(data) {
    const hash = bcrypt.hashSync(data.password, 10);
    const email = data.email.trim().toLowerCase();
    const newUser = {
      id: data.id || uuid.v4(),
      email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hash,
      address: data.address,
      isAdmin: data.isAdmin || false,
    };
    this.users.push(newUser);
    return newUser;
  }
}
export default new User();
