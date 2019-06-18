import pool from './db/dbControl';

class Database {
  createTables() {
    const tables = `CREATE TABLE IF NOT EXISTS
      users (
        id bigserial NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR (200) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY (id));
        
      CREATE TABLE IF NOT EXISTS
        cars (
        id bigserial NOT NULL,
        owner INTEGER NOT NULL,
        created_on VARCHAR(128) NOT NULL,
        state VARCHAR(128) NOT NULL,
        status VARCHAR (128) NOT NULL,
        price VARCHAR(128) NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL,
        PRIMARY KEY (id));`;
    pool.query(tables);
  }
}
export default Database;
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
