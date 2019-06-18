import db from '../db/dbControl';
import '@babel/polyfill';

class carServices {
  static async getOne(id) {
    const text = 'SELECT * FROM cars WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);

      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}
export default carServices;
