

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _bcrypt = _interopRequireDefault(require('bcrypt'));

const _userModel = _interopRequireDefault(require('../models/userModel'));

const _auth = _interopRequireDefault(require('../middleware/auth'));

const _userValidation = _interopRequireDefault(require('../validations/userValidation'));

const _validationhandler = _interopRequireDefault(require('../middleware/validationhandler'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = {
  create: function create(req, res, next) {
    const notValid = _validationhandler.default.validator(req.body, _userValidation.default.signupSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    const oldUser = _userModel.default.findEmail(req.body.email);

    if (!oldUser) {
      const newUser = _userModel.default.create(req.body);

      const token = _auth.default.createToken({
        id: newUser.id,
      });

      return res.status(201).send({
        status: 201,
        data: {
          Token: token,
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    }

    const err = new Error('email already exists');
    err.status = 400;
    next(err);
  },
  login: function login(req, res, next) {
    const notValid = _validationhandler.default.validator(req.body, _userValidation.default.loginSchema);

    if (notValid) {
      return res.status(400).send(notValid);
    }

    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();

    const oldUser = _userModel.default.findEmail(email);

    if (!oldUser) {
      return res.status(404).send({
        status: 404,
        message: 'email not found pleas signup',
      });
    }

    if (_bcrypt.default.compareSync(req.body.password, oldUser.password)) {
      const token = _auth.default.createToken({
        id: oldUser.id,
      });

      return res.status(200).send({
        status: 200,
        data: {
          Token: token,
          id: oldUser.id,
          firstName: oldUser.firstName,
          lastName: oldUser.lastName,
          email: oldUser.email,
        },
      });
    }

    const err = new Error('wrong password ');
    err.status = 404;
    next(err);
  },
};
const _default = User;
exports.default = _default;
