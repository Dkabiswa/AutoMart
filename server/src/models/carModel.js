import moment from 'moment';


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
  getState(status, state){
    const aCars = this.getUnsold(status);
    return aCars.filter(car => car.state === state);
  }
  addImages(id, images) {
    const c = this.findId(id);
    c.images= images;
  }

  create(data) {
    let newId, x =this.cars.length;
    if( x === 0){
      newId = 1; 
    } else {
      newId = this.cars[x -1].id + 1;
    }
    
    const newCar = {
      id: data.id || newId,
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
