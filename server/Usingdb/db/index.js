
import 'dotenv/config';
import logger from 'console';
import { Pool } from 'pg';
import config from '../../config/config';

logger.log(process.env.TYPE);

logger.log(config(process.env.NODE_ENV).databaseUrl);

const pool = new Pool({
  connectionString: config(process.env.NODE_ENV).databaseUrl,
});

export default {

  query(text, params) {
    return new Promise((resolve, reject) => pool.query(text, params)
      .then(res => resolve(res))
      .catch(err => reject(err)));
  },
};
