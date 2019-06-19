

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _joi = _interopRequireDefault(require('@hapi/joi'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OrderSchema = {
  createSchema: _joi.default.object().keys({
    id: _joi.default.number().integer().optional(),
    buyer: _joi.default.number().integer().required(),
    carId: _joi.default.number().integer().required(),
    amount: _joi.default.number().required(),
  }),
  updateSchema: _joi.default.object().keys({
    newAmount: _joi.default.number().required(),
  }),
};
const _default = OrderSchema;
exports.default = _default;
