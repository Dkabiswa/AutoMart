import uuid from 'uuid';

class Order {
  constructor() {
    this.orders = [];
  }

  create(data) {
    const newOrder = {
      id: data.id || uuid.v4(),
      buyer: data.buyer,
      carId: data.carId,
      amount: data.amount,
      status: data.status || 'pending',
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findId(id) {
    return this.orders.find(order => order.id === id);
  }
}

export default new Order();
