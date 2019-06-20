import db from '../db/dbControl';
import '@babel/polyfill';

class Flag {
  async createFlag(values) {
  	const query = `INSERT INTO
      flags (car_id, created_on, reason, description)
      VALUES ($1, $2, $3, $4)
      returning *`;
    const newflag = await db.query(query, values)
      .then(res => res).catch(err => err);
    return newflag;
  }
}
export default new Flag();
