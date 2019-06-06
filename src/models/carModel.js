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
        model: 'C-class',
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
        model: 'B-class',
        bodyType: 'Truck',
      },
    ];
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
}
export default new Car();
