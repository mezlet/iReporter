import dotenv from 'dotenv';
import logger from 'console';
import express from 'express';
import router from './Usingjs/routes';
// import incidentobj from './Usingjs/controllers/redFlagController';
// import incidentdb from './Usingdb/controllers/incidents';
import userdb from './Usingdb/controllers/user';
// import Auth from './Usingdb/middleware/Auth';


const PORT = process.env.PORT || 5000;

dotenv.config();
// const incident = process.env.TYPE === 'db' ? incidentdb : incidentobj;
const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => res.status(200).send({ message: 'Hello welcome to my page' }));
app.post('/api/v1/auth/signup', userdb.create);
app.post('/api/v1/auth/login', userdb.login);

app.listen(PORT, () => {
  logger.log(`Running at ${PORT}`);
});

export default app;
