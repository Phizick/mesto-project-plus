import express, { Application } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import router from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';
import UserController from './controllers/users';
import authMiddleware from './middlewares/auth';
import { requestLogger } from './middlewares/requestLogger';
import { errorLogger } from './middlewares/errorLogger';
import { createUserValidation, loginValidation } from './validation/userValidation';

require('dotenv').config();

const PORT = process.env.PORT || 3025;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/test';
const app: Application = express();

app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginValidation, UserController.login);
app.post('/signup', createUserValidation, UserController.createUser);
app.use(authMiddleware);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(`${DB_URL}`);
    app.listen(
      PORT,
      () => console.log(`Server started on port ${PORT}`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
