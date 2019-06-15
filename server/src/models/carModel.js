import moment from 'moment';
import uuid from 'uuid';

class Car {
  constructor() {
    this.cars = [];
  }

  getAll() {
    return this.cars;
  }

  findId(id) {
    return this.cars.find(car => car.id === id);
  }

  getUnsold(status) {
    return this.cars.filter(car => car.status === status);
  }

  create(data) {
    const newCar = {
      id: data.id || uuid.v4(),
      owner: data.owner,
      createdOn: moment.now(),
      state: data.state,
      status: data.status || 'available',
      price: data.price,
      manufacturer: data.manufacturer,
      model: data.model,
      bodyType: data.bodyType,
    };
    this.cars.push(newCar);
    return newCar;
  }

  deleteId(id) {
    const c = this.findId(id);
    this.cars = this.cars.filter(car => car !== c);
  }
}
export default new Car();