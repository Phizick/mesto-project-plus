import { Joi, celebrate, Segments } from 'celebrate';
import { urlRegExp } from '../constants/urlRegExp';

export const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

export const updateUserInfoValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const updateUserAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlRegExp),
  }),
});
