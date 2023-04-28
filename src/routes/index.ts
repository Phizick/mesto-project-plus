import {
  NextFunction, Router, Request, Response,
} from 'express';
import userRouter from './users';
import cardRouter from './cards';
import ErrorHandler from '../errors/errors';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(ErrorHandler.notFound('page not found'));
});

export default router;
