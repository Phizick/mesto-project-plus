import { Joi, celebrate, Segments } from 'celebrate';
import { urlRegExp } from '../constants/urlRegExp';

export const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
});

export const getCardValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
