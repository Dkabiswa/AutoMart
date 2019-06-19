import moment from 'moment';

class Flag {
  constructor() {
    this.flags = [];
  }

  create(data) {
    let newId; const
      x = this.flags.length;
    if (x === 0) {
      newId = 1;
    } else {
      newId = this.flags[x - 1].id + 1;
    }
    const newFlag = {
      id: data.id || newId,
      carId: data.carId,
      createdOn: moment.now(),
      reason: data.reason,
      description: data.description,
    };
    this.flags.push(newFlag);
    return newFlag;
  }
}

export default new Flag();
