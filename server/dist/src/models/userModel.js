

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _uuid = _interopRequireDefault(require('uuid'));

const _bcrypt = _interopRequireDefault(require('bcrypt'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

const User =
/* #__PURE__ */
(function () {
  function User() {
    _classCallCheck(this, User);

    this.users = [];
  }

  _createClass(User, [{
    key: 'findId',
    value: function findId(id) {
      return this.users.find(user => user.id === id);
    },
  }, {
    key: 'findEmail',
    value: function findEmail(email) {
      return this.users.find(user => user.email === email);
    },
  }, {
    key: 'create',
    value: function create(data) {
      const hash = _bcrypt.default.hashSync(data.password, 10);

      const email = data.email.trim().toLowerCase();
      const newUser = {
        id: data.id || _uuid.default.v4(),
        email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hash,
        address: data.address,
        isAdmin: data.isAdmin || false,
      };
      this.users.push(newUser);
      return newUser;
    },
  }]);

  return User;
}());

const _default = new User();

exports.default = _default;
