import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as process from 'process';
import jwt from 'jsonwebtoken';
import { mySecretKey } from '../constants/myKey';
import User from '../models/user';
import InternalServerError from '../errors/InternalServerError';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';
import ConflictingRequestError from '../errors/ConflictingRequestError';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const {
      name, about, avatar, email, password,
    } = req.body;
    if (!email || !password) {
      return next(new BadRequestError('Incorrect user data'));
    }
    try {
      const uniqueUser = await User.findOne({ email });
      if (uniqueUser) {
        return next(new ConflictingRequestError('User with this email already exists'));
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        about,
        avatar,
        email,
        password: hashPassword,
      });
      return res.json({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(new NotFoundError('user not found'));
      }
      res.json({ data: user });
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async getUserInfo(req: any, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return next(new NotFoundError('user not found'));
      }
      res.send({ data: user });
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      console.error(error);
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      return res.json({ data: users });
    } catch (error) {
      console.error(error);
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async updateUserInfo(req: any, res: Response, next: NextFunction) {
    const { name, about } = req.body;
    const id = req.user?._id;

    try {
      if (!name || !about) {
        return next(new BadRequestError('incorrect data'));
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
        return next(new NotFoundError('user not found'));
      }
      return res.json({ data: user });
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async updateUserAvatar(req: any, res: Response, next: NextFunction) {
    const { avatar } = req.body;
    const id = req.user?._id;

    try {
      if (!avatar) {
        return next(new BadRequestError('incorrect data'));
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
        return next(new NotFoundError('user not found'));
      }
      return res.json({ data: user });
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async login(req: any, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await User.findUserByData(email, password);
      return res.send({
        token: jwt.sign({ _id: user._id }, process.env.TOKEN_ENV as string || mySecretKey, { expiresIn: '7d' }),
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default new UserController();
