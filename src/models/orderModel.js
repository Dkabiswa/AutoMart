import uuid from 'uuid';

class Order {
  constructor() {
    this.orders = [
      {
        id: 1,
        buyer: 2, // user id
        carId: 1,
        amount: 1000, // amount offered
        status: 'pending',
      },
      {
        id: 2,
        buyer: 4, // user id
        carId: 2,
        amount: 2000, // amount offered
        status: 'pending',
      },
    ];
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
