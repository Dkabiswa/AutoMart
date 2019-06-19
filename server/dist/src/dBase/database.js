"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbControl = _interopRequireDefault(require("./db/dbControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, [{
    key: "createTables",
    value: function createTables() {
      var tables = "CREATE TABLE IF NOT EXISTS\n      users (\n        id bigserial NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR(128) NOT NULL,\n        password VARCHAR (200) NOT NULL,\n        address VARCHAR(128) NOT NULL,\n        is_admin BOOLEAN NOT NULL DEFAULT FALSE,\n        PRIMARY KEY (id));\n        \n      CREATE TABLE IF NOT EXISTS\n      orders (\n        id bigserial NOT NULL,\n        buyer INTEGER NOT NULL,\n        car_id INTEGER NOT NULL,\n        amount VARCHAR(128) NOT NULL,\n        status VARCHAR (128) NOT NULL,\n        PRIMARY KEY (id),\n        FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE,\n        FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE);\n\n      CREATE TABLE IF NOT EXISTS\n        cars (\n        id bigserial NOT NULL,\n        owner INTEGER NOT NULL,\n        created_on VARCHAR(128) NOT NULL,\n        state VARCHAR(128) NOT NULL,\n        status VARCHAR (128) NOT NULL,\n        price VARCHAR(128) NOT NULL,\n        manufacturer VARCHAR(128) NOT NULL,\n        model VARCHAR(128) NOT NULL,\n        body_type VARCHAR(128) NOT NULL,\n        PRIMARY KEY (id),\n        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE);\n        ";

      _dbControl["default"].query(tables);
    }
  }]);

  return Database;
}();

var _default = Database;
/*
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropCarTable = () => {
  const queryText = 'DROP TABLE IF EXISTS cars returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
*/

exports["default"] = _default;