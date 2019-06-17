import Joi from '@hapi/joi';

const UserSchema = {

  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  }),

  signupSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).max(20).required()
      .regex(/^[A-Za-z]+$/),
    lastName: Joi.string().min(3).max(20).required()
      .regex(/^[A-Za-z]+$/),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    address: Joi.string().required().regex(/^[A-Za-z]+$/),
    isAdmin: Joi.bool(),
  }),
};

export default UserSchema;
