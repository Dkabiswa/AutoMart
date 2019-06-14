import Joi from '@hapi/joi';

const CarSchema = {

  createSchema: Joi.object().keys({
    id: Joi.number().integer().optional(),
    owner: Joi.number().integer().required(),
    state: Joi.string().valid(['new', 'old']).required(),
    status: Joi.string().default('available').regex(/^[A-Za-z]+$/),
    price: Joi.number().required(),
    manufacturer: Joi.string().required().regex(/^[A-Za-z]+$/),
    model: Joi.string().required().regex(/^[A-Za-z]+$/),
    bodyType: Joi.string().required().regex(/^[A-Za-z]+$/),
  }),

  carIdSchema: Joi.object().keys({
    id: Joi.number().integer().min(0).required(),
  }),

  querySchema: Joi.object().keys({
    status: Joi.string().valid(['available']).required(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
  }),

  markSchema: Joi.object().keys({
  	status: Joi.string().valid('sold').required(),
  }),
};

export default CarSchema;
