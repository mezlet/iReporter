import 'dotenv/config';
import { Pool } from 'pg';
import config from '../../config/config';

import { createUserTable as userTable, createIncidentTable as incidentTable } from './queries';

const tables = [userTable, incidentTable];

const pool = new Pool({
  connectionString: config(process.env.NODE_ENV).databaseUrl,
});

const prepareDB = () => {
  tables.forEach(queryText => pool.query(queryText));
};

export default prepareDB;
