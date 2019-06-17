const { pool } = require('./db/dbControl');

pool.on('connect', () => {
  console.log('connected to the db');
});

const userTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id bigserial PRIMARY KEY NOT NULL,
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
};


const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
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


pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  userTable,
  dropUserTable,
};


require('make-runnable');
