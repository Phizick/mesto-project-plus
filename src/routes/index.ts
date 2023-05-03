import {
  NextFunction, Router, Request, Response,
} from 'express';
import userRouter from './users';
import cardRouter from './cards';
import NotFoundError from '../errors/NotFoundError';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('page not found'));
});

export default router;
