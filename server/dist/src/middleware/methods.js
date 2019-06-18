

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const method = function method(req, res) {
  return res.status(405).send({
    status: 405,
    message: 'method not allowed',
  });
};

const _default = method;
exports.default = _default;
