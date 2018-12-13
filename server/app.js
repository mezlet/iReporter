import babel_polyfill from 'babel-polyfill';
import dotenv from 'dotenv';
import logger from 'console';
import express from 'express';
import router from './Usingjs/routes';
import incidentobj from './Usingjs/controllers/redFlagController';
import incidentdb from './Usingdb/controllers/incidents';
import userdb from './Usingdb/controllers/user';
import Auth from './Usingdb/middleware/Auth';


const PORT = process.env.PORT || 5000;

dotenv.config();
const incident = process.env.TYPE === 'db' ? incidentdb : incidentobj;
const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => res.status(200).send({ message: 'Hello welcome to my page' }));
app.post('/api/v1/auth/signup', userdb.create);
app.post('/api/v1/auth/login', userdb.login);
app.post('/api/v1/incident', Auth.verifyToken, incidentdb.create);
app.get('/api/v1/incident', Auth.verifyToken, incidentdb.getAll);
app.get('/api/v1/redflag', Auth.verifyToken, incidentdb.getRedFlag);
app.get('/api/v1/intervention', Auth.verifyToken, incidentdb.getIntervention);
app.get('/api/v1/incident/:id', Auth.verifyToken, incidentdb.getOne);
app.patch('/api/v1/incident/:id', Auth.verifyToken, incidentdb.update);
app.patch('/api/v1/incident/:id/status', Auth.verifyToken, incidentdb.updateStatus);
app.patch('/api/v1/incident/:id/comment', Auth.verifyToken, incidentdb.updateComment);
app.patch('/api/v1/incident/:id/location', Auth.verifyToken, incidentdb.updateLocation);
app.delete('/api/v1/incident/:id', Auth.verifyToken, incident.delete);


app.listen(PORT, () => {
  logger.log(`Running at ${PORT}`);
});

export default app;
