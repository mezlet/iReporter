import 'dotenv/config';
import express from 'express';
import logger from 'console';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Running at ${PORT}`);
});

export default app;
