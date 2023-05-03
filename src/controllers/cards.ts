import { Response, NextFunction } from 'express';
import Card from '../models/card';
import ForbiddenError from '../errors/ForbiddenError';
import InternalServerError from '../errors/InternalServerError';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

class CardController {
  async createCard(req: any, res: Response, next: NextFunction) {
    const { name, link } = req.body;
    const owner = req.user?._id;
    try {
      if (!name || !link) {
        return next(new BadRequestError('incorrect data'));
      }
      const card = await Card.create({ name, link, owner });
      return res.json({ data: card });
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error && error.name === 'ValidationError') {
        return next(new BadRequestError('Incorrect data'));
      }
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async getAllCards(req: any, res: Response, next: NextFunction) {
    try {
      const cards = await Card.find({});
      return res.json({ data: cards });
    } catch (error) {
      console.error(error);
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async removeCard(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    try {
      const card = await Card.findById(cardId);
      if (!card) {
        return next(new NotFoundError('Card not found'));
      }
      if (card.owner.toString() !== req.user?._id) {
        return next(new ForbiddenError('Action prohibited'));
      }
      await card.deleteOne();
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(new InternalServerError('Server error'));
    }
  }

  async cardLike(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user?._id;

    try {
      if (!cardId) {
        return next(new BadRequestError('incorrect data'));
      }
      const card = await Card.findByIdAndUpdate(
        cardId,
        {
          $addToSet: {
            likes: id,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!card) {
        return next(new NotFoundError('card not found'));
      }
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }

  async cardDislike(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user?._id;

    try {
      if (!cardId) {
        return next(new BadRequestError('incorrect data'));
      }
      const card = await Card.findByIdAndUpdate(
        cardId,
        {
          $pull: {
            likes: id,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!card) {
        return next(new NotFoundError('card not found'));
      }
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(new InternalServerError('На сервере произошла ошибка'));
    }
  }
}
// @ts-ignore
export default new CardController();
