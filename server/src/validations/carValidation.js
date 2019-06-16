import Joi from '@hapi/joi';

const CarSchema = {

  createSchema: Joi.object().keys({
    id: Joi.number().integer().optional(),
    owner: Joi.number().integer().required(),
    state: Joi.string().valid(['new', 'used']).required(),
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
    state: Joi.string().valid(['used', 'new']),
    manufacturer: Joi.string().regex(/^[A-Za-z]+$/),
  }),

  markSchema: Joi.object().keys({
  	status: Joi.string().valid('sold').required(),
  }),

  bodySchema: Joi.object().keys({
    bodyType: Joi.string().required().regex(/^[A-Za-z]+$/),
  }),
};

export default CarSchema;
