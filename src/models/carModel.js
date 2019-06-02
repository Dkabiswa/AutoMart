import moment from 'moment';
import uuid from 'uuid';

class Car {

  constructor() {
    this.cars = [
      {
        id: 1,
        owner: 2,
        createdOn: 'wed 4',
        state: 'new',
        status: 'available',
        price: 200,
        manufacturer: 'Benz',
        model : 'C-class',
        bodyType: 'Truck',
      },
      {
        id: 2,
        owner: 4,
        createdOn: 'wed 5',
        state: 'new',
        status: 'sold',
        price: 400,
        manufacturer: 'Benz',
        model : 'B-class',
        bodyType: 'Truck',
      },
    ];
  }
  getAll() {
    return this.cars.filter(car => car.status === "available");
  }

}
export default new Car();