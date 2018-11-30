import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import logger from 'console';
import router from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Running at ${PORT}`);
});

export default app;
