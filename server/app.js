import dotenv from 'dotenv';
import express from 'express';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ message: 'Hi welcome to my page' }));

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});

export default app;
