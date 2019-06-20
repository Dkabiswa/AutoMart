import db from '../db/dbControl';
import '@babel/polyfill';

class Order {
  async checkId(id) {
    const itext = 'SELECT * FROM orders WHERE id = $1';
    const order = await db.query(itext, [id])
      .then(res => res).catch(err => err);
    return order;
  }

  async createOrder(values) {
  	const query = `INSERT INTO
      orders (buyer, car_id, amount, status)
      VALUES ($1, $2, $3, $4)
      returning *`;
    const newOrder = await db.query(query, values)
      .then(res => res).catch(err => err);
    return newOrder;
  }

  async updateOrder(values) {
    const pricetext = `UPDATE orders
      SET amount=$1
      WHERE id=$2 returning *`;
    const change = await db.query(pricetext, values)
      .then(res => res).catch(err => err);
    return change;
  }
}
export default new Order();
