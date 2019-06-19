"use strict";

var _dbControl = _interopRequireDefault(require("./dbControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tables = "CREATE TABLE IF NOT EXISTS\n      users (\n        id bigserial NOT NULL,\n        email VARCHAR(128) UNIQUE NOT NULL,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR(128) NOT NULL,\n        password VARCHAR (200) NOT NULL,\n        address VARCHAR(128) NOT NULL,\n        is_admin BOOLEAN NOT NULL DEFAULT FALSE,\n        PRIMARY KEY (id));\n\n      CREATE TABLE IF NOT EXISTS\n        cars (\n        id bigserial NOT NULL,\n        owner INTEGER NOT NULL,\n        created_on VARCHAR(128) NOT NULL,\n        state VARCHAR(128) NOT NULL,\n        status VARCHAR (128) NOT NULL,\n        price VARCHAR(128) NOT NULL,\n        manufacturer VARCHAR(128) NOT NULL,\n        model VARCHAR(128) NOT NULL,\n        body_type VARCHAR(128) NOT NULL,\n        PRIMARY KEY (id),\n        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE);\n  \n      CREATE TABLE IF NOT EXISTS\n      orders (\n        id bigserial NOT NULL,\n        buyer INTEGER NOT NULL,\n        car_id INTEGER NOT NULL,\n        amount VARCHAR(128) NOT NULL,\n        status VARCHAR (128) NOT NULL,\n        PRIMARY KEY (id),\n        FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE,\n        FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE);";

_dbControl["default"].query(tables).then(function (res) {
  console.log(res);
})["catch"](function (err) {
  console.log(err);
});
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