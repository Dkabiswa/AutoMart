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
        password: '$2b$10$M7ATOD1wug/BGS2GsKioyu5vHkZw1uApJvZWwchWruUpMI7L4TUGu', //12345
        address: 'kampala',
        isAdmin: false,
      },
      {
        id: 4,
        email: 'mgat@gmail.com',
        firstName: 'mgat',
        lastName: 'dgat',
        password: '$2b$10$ke4uXf7ZYU0AhoH0wIQoP.4Usa6vgajITC3iih8G2S9.GXPTmQmJm',//gdat1234
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
    const email = data.email.trim().toLowerCase();
    const newUser = {
      id: data.id || uuid.v4(),
      email: email,
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
