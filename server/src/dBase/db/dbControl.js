const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
const env = process.env.NODE_ENV;
let database;
switch (env) {
  case 'develop': {
    database = process.env.DEV_DB_URL;
    break;
  }
  case 'test': {
    database = process.env.TEST_DB_URL;
    break;
  }
  case 'production': {
    database = process.env.DATABASE_URL;
    break;
  }
}

const pool = new Pool({ connectionString: database });

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
  const queryText = 'DROP TABLE IF EXISTS users, cars, orders, flags CASCADE';
  query(queryText)
};

const createAdmin = () => {
  const email = 'admin@gmail.com';
  const first_name = 'admin';
  const last_name = 'adminstrator';
  const password = bcrypt.hashSync('adminpassword1', 10);
  const address = 'kampala';
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
  query(admin, values)
        
};

module.exports = {
  pool,
  query,
  dropTables,
  createAdmin,
};
require('make-runnable');
