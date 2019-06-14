import Joi from '@hapi/joi';

const Validation = {
  validator(body, schema) {
    const { error } = Joi.validate(body, schema);
    if (error) {
      const response = {
        stautus: 400,
        error: error.details[0].message,
      };
      return response;
    }
  },
};
export default Validation;
