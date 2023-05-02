import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errorMiddleware from './middlewares/errorMiddleware';
import userController from './controllers/users';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());

app.post('/signin', userController.login);
app.post('/signup', userController.createUser);
app.use('/', router);
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
