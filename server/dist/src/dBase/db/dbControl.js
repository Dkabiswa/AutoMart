"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

var bcrypt = require('bcrypt');

dotenv.config();
var env = process.env.NODE_ENV;
var database;

switch (env) {
  case 'dev':
    {
      database = process.env.DB_NAME;
      break;
    }

  case 'test':
    {
      database = process.env.TEST_DB;
      break;
    }
}

var config = {
  user: process.env.DB_USER,
  database: database,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000
};
var pool = new Pool(config);

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    })["catch"](function (err) {
      reject(err);
    });
  });
};

var dropTables = function dropTables() {
  var queryText = 'DROP TABLE IF EXISTS users, cars, orders CASCADE';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

var createAdmin = function createAdmin() {
  var email = 'admin@gmail.com';
  var first_name = 'admin';
  var last_name = 'adminstrator';
  var password = bcrypt.hashSync('adminpassword1', 10);
  var address = 'kampala';
  var is_admin = true;
  var admin = "\n    INSERT INTO\n      users (email, first_name, last_name, password, address, is_admin)\n      VALUES ($1, $2, $3, $4, $5, $6)";
  var values = [email, first_name, last_name, password, address, is_admin];
  pool.query(admin, values).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};

module.exports = {
  pool: pool,
  query: query,
  dropTables: dropTables,
  createAdmin: createAdmin
};

require('make-runnable');