import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../errors/errors';
import User from '../models/user';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { name, about, avatar } = req.body;
    if (!name || !about || !avatar) {
      return next(ErrorHandler.badRequest('incorrect user data'));
    }
    try {
      const user = await User.create({ name, about, avatar });
      return res.json({ data: user });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('На сервере произошла ошибка'));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(ErrorHandler.authorization('user not found'));
      }
      res.json({ data: user });
    } catch (error: unknown) {
      // @ts-ignore
      if (error instanceof ErrorHandler) {
        return next(error);
      }
      console.error(error);
      next(ErrorHandler.internal('На сервере произошла ошибка'));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      return res.json({ data: users });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('На сервере произошла ошибка'));
    }
  }

  async updateUserInfo(req: any, res: Response, next: NextFunction) {
    const { name, about } = req.body;
    const id = req.user?._id;

    try {
      if (!name || !about) {
        return next(ErrorHandler.badRequest('incorrect data'));
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          name,
          about,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!user) {
        return next(ErrorHandler.authorization('user not found'));
      }
      return res.json({ data: user });
    } catch (error) {
      console.log(error);
      next(ErrorHandler.internal('На сервере произошла ошибка'));
    }
  }

  async updateUserAvatar(req: any, res: Response, next: NextFunction) {
    const avatar = req.body;
    const id = req.user?._id;

    try {
      if (!avatar) {
        return next(ErrorHandler.badRequest('incorrect data'));
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          avatar,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!user) {
        return next(ErrorHandler.authorization('user not found'));
      }
      return res.json({ data: user });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('На сервере произошла ошибка'));
    }
  }
}

export default new UserController();
