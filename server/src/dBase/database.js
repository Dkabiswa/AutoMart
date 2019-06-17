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


const userTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR (50) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS table';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});
 
 module.exports = {
  pool,
  userTable,
  dropUserTable
};


require('make-runnable');