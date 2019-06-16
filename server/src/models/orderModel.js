
class Order {
  constructor() {
    this.orders = [];
  }

  create(data) {
    let newId, x =this.orders.length;
    if( x === 0){
      newId = 1; 
    } else {
      newId = this.orders[x -1].id + 1;
    }
    const newOrder = {
      id: data.id || newId,
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
