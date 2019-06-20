import db from '../db/dbControl';
import '@babel/polyfill';

class User {
  async checkEmail(email) {
    const etext = 'SELECT * FROM users WHERE email = $1';
    const user = await db.query(etext, [email])
      .then(res => res).catch(err => err);
    return user;
  }

  async checkId(id) {
    const itext = 'SELECT * FROM users WHERE id = $1';
    const users = await db.query(itext, [id])
      .then(res => res).catch(err => err);
    return users;
  }

  async createUser(values) {
  	const query = `INSERT INTO
      users (email, first_name, last_name, password, address, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      returning *`;

    const newUser = await db.query(query, values)
      .then(res => res).catch(err => err);
    return newUser;
  }
  async updateAdmin(values) {
    const text = `UPDATE users
      SET is_admin=$1
      WHERE id=$2 returning *`;
    const change = await db.query(text, values)
      .then(res => res).catch(err => err);
    return change;
  }
}
export default new User();
