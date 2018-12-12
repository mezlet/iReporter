/* eslint-disable linebreak-style */
import 'dotenv/config';
import logger from 'console';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  logger.log('connected to the db');
});

const createincidentTable = () => {
  const queryText = `CREATE TABLE incident
    (
        id uuid NOT NULL,
        createdon timestamp NOT NULL DEFAULT now(),
        createdby integer NOT NULL,
        type VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 'pending',
        image VARCHAR(128)  NOT NULL,
        video VARCHAR(128)  NOT NULL,
        comment VARCHAR(128)
    )`;

  pool.query(queryText)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createUserTable = () => {
  const queryText = `CREATE TABLE users
    (
        id SERIAL PRIMARY KEY,
        firstname character varying(128)  NOT NULL,
        lastname character varying(128)  NOT NULL,
        othernames character varying(128)  NOT NULL,
        email character varying(128) NOT NULL UNIQUE,
        phonenumber character varying(128)  NOT NULL,
        username character varying(128)  NOT NULL UNIQUE,
        password character varying(128)  NOT NULL,
        registered timestamp without time zone DEFAULT now(),
        isadmin boolean NOT NULL DEFAULT false   
    );`;

  pool.query(queryText)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};


const dropincidentTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incident returning *';
  pool.query(queryText)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      logger.log(res);
      pool.end();
    })
    .catch((err) => {
      logger.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
  createincidentTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropincidentTable();
};

pool.on('remove', () => {
  logger.log('client removed');
  process.exit(0);
});


module.exports = {
  createincidentTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropincidentTable,
  dropAllTables,
};
