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

pool.on('connect', () => {
  console.log('connected to the Database');
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
 
 module.exports = {
  pool
};


require('make-runnable');