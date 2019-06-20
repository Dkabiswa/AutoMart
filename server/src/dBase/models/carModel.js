import db from '../db/dbControl';
import '@babel/polyfill';

class Car {
  async allCars() {
    const alltext = 'SELECT * FROM cars';
    const cars = await db.query(alltext)
      .then(res=>res).catch(err=>err); 
      return cars;    
  }

  async checkId(id) {
    const ctext = 'SELECT * FROM cars WHERE id = $1';
    const car = await db.query(ctext, [id])
      .then(res=>res).catch(err=>err);
      return car;    
  }

  async createCar(values) {
  	const text = `INSERT INTO
      cars(owner, created_on, state, status, price, manufacturer,  model, body_type)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
      const newCar = await db.query(text, values)
        .then(res=>res).catch(err=>err);
        return newCar;
  }

  async updatePrice(values) {
    const pricetext = `UPDATE cars
      SET price=$1
      WHERE id=$2 returning *`;
    const change = await db.query(pricetext, values)
      .then(res=>res).catch(err=>err);
      return change;
  }

  async markSold(values) {
    const stext = `UPDATE cars
      SET status=$1
      WHERE id=$2 returning *`;
    const response = await db.query(stext, values)
      .then(res=>res).catch(err=>err);
      return response;
  }

  async unSold(values) {
    const unsold = 'SELECT * FROM cars WHERE status = $1';
    const option = await db.query(unsold, values)
      .then(res=>res).catch(err=>err);
      return option;
  }

  async deleteCar(id) {
    const deletetext= 'DELETE FROM cars WHERE id = $1 returning *';
    const dcars = await db.query(deletetext, id)
      .then(res=>res).catch(err=>err);
      return dcars;    
  }

}
export default new Car();