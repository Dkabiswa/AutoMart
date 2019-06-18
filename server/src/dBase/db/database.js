import pool from './dbControl';

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
        PRIMARY KEY (id),
        FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE);
  
      CREATE TABLE IF NOT EXISTS
      orders (
        id bigserial NOT NULL,
        buyer INTEGER NOT NULL,
        car_id INTEGER NOT NULL,
        amount VARCHAR(128) NOT NULL,
        status VARCHAR (128) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (buyer) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE);`

        ;

    pool.query(tables);
    const query = `INSERT INTO
      users (email, first_name, last_name, password, address, is_admin)
      VALUES ($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      "email@gmail.com",
      "last_name",
      "first_name",
      "password",
      "address",
      true,
    ];

    pool.query(query, values);
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
