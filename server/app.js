import 'dotenv/config';
import express from 'express';
import logger from 'console';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.get('/', (req,res)=>{
  res.send("Welcome to my page, please attach an api/v1/ to view my endpoints");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.log(`Running at ${PORT}`);
});

export default app;
