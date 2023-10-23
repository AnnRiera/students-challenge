import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { router } from './routes/router';
import { errorHandler } from './middlewares/errorHandler.middleware';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Welcome to Students attendance app!' });
});

app.use(
  '/api/public',
  express.static(path.join(__dirname, '/public'))
);

app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
