const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV;
let database;
switch (env) {
  case 'dev': {
    database = process.env.DB_NAME;
    break;
  }
  case 'test': {
    database = process.env.TEST_DB;
    break;
  }
}
const config = {
  user: process.env.DB_USER,
  database,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

const query = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users, cars, orders CASCADE';
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


module.exports = {
  pool,
  query,
  dropTables,
};
require('make-runnable');
