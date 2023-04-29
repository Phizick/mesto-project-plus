import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import errorMiddleware from './middleware/errorMiddleware';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());

app.use((req: any, res, next) => {
  req.user = {
    _id: '644aa6b337ae86e426ed79a2',
  };

  next();
});

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
