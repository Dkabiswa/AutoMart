const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt  = require('bcrypt');

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

const createAdmin = () => {
  const email ='admin@gmail.com';
  const first_name = 'admin';
  const last_name ='adminstrator';
  const password = bcrypt.hashSync('adminpassword1', 10);
  const address= 'kampala';
  const is_admin = true;
  const admin = `
    INSERT INTO
      users (email, first_name, last_name, password, address, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)`;   

    const values = [
    email, 
    first_name,
    last_name,
    password,
    address,
    is_admin, 
    ];
  pool.query(admin, values)
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
  createAdmin,
};
require('make-runnable');
