import Joi from '@hapi/joi';

const FlagSchema = {

  createSchema: Joi.object().keys({
  	id: Joi.number().integer().optional(),
    carId: Joi.number().integer().required(),
    reason: Joi.string()
    .required()
    .regex(/["']?[a-zA-Z][^.?!]+((?![.?!]['"]?\s["']?[a-zA-Z][^.?!]).)+[.?!'"]+/),
    description: Joi.string()
    .required()
    .regex(/["']?[a-zA-Z][^.?!]+((?![.?!]['"]?\s["']?[a-zA-Z][^.?!]).)+[.?!'"]+/),
  }),

};

export default FlagSchema;
