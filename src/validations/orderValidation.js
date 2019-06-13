import Joi from '@hapi/joi';

const OrderSchema = {

  createSchema: Joi.object().keys({
    buyer: Joi.number().integer().required(),
    carId: Joi.number().integer().required(),
    amount: Joi.number().required(),
  }),

  updateSchema: Joi.object().keys({
    newAmount: Joi.number().required(),
  }),
};

export default OrderSchema;
