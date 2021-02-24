const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
pool.on('connect', () => {
  console.log('connected to the db');
});
/**
 * Create Tables
 */
const createIncidentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  incidents(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    location VARCHAR(255) NOT NULL,
    comment VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    video VARCHAR(255) NOT NULL,
    createdby integer NOT NULL,
    createdon timestamp NOT NULL DEFAULT now()
      )`;
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othernames VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        username VARCHAR(128) NOT NULL UNIQUE,
        password VARCHAR(128) NOT NULL,
        phonenumber VARCHAR(128) NOT NULL,
        registered timestamp without time zone DEFAULT now(),
        isadmin boolean NOT NULL DEFAULT false 
      )`;
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop Tables
 */
const dropIncidentTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incidents';
  pool
    .query(queryText)
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
  createIncidentTable,
  createUserTable,
  dropIncidentTable,
  dropUserTable,
};
require('make-runnable');
