const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
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


module.exports = {
  pool,
  query,
};
