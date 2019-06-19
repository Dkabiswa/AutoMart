

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _joi = _interopRequireDefault(require('@hapi/joi'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Validation = {
  validator: function validator(body, schema) {
    const _Joi$validate = _joi.default.validate(body, schema);
    const { error } = _Joi$validate;

    if (error) {
      const response = {
        stautus: 400,
        error: error.details[0].message,
      };
      return response;
    }
  },
};
const _default = Validation;
exports.default = _default;
