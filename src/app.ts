import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';
import UserController from './controllers/users';
import authMiddleware from './middlewares/auth';
import { requestLogger } from './middlewares/requestLogger';
import { errorLogger } from './middlewares/errorLogger';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', UserController.login);
app.post('/signup', UserController.createUser);
app.use(authMiddleware);
app.use('/', router);
app.use(errorLogger);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    app.listen(
      PORT,
      () => console.log(`Server started on port ${PORT}`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
