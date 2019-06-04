import uuid from 'uuid';
import bcrypt from 'bcrypt';

class User {
  constructor() {
    this.users = [
      {
        id: 1,
        email: 'dkat@gmail.com',
        firstName: 'dkat',
        lastName: 'gkat',
        password: 12345,
        address: 'kampala',
        isAdmin: false,
      },
      {
        id: 4,
        email: 'mgat@gmail.com',
        firstName: 'mgat',
        lastName: 'dgat',
        password: 'gdat1234',
        address: 'mukono',
        isAdmin: false,
      },
    ];
  }

  findEmail(email) {
    return this.users.find(user => user.email === email);
  }

  create(data) {
    const hash = bcrypt.hashSync(data.password, 10);
    const newUser = {
      id: data.id || uuid.v4(),
      email: data.email,
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
