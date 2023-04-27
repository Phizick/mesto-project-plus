import { Response, NextFunction } from 'express';
import ErrorHandler from '../errors/errors';
import Card from '../models/card';

class CardsController {
  async createCard(req: any, res: Response, next: NextFunction) {
    const { name, link } = req.body;
    const owner = req.user?._id;
    try {
      if (!name || !link) {
        return next(ErrorHandler.badRequest('incorrect data'));
      }
      const card = await Card.create({ name, link, owner });
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('server error'));
    }
  }

  async getAllCards(req: any, res: Response, next: NextFunction) {
    try {
      const cards = await Card.find({});
      return res.json({ data: cards });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('server error'));
    }
  }

  async removeCard(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    try {
      await Card.findByIdAndUpdate(cardId)
        .then((card) => {
          if (!card) {
            return next(ErrorHandler.authorization('card not found'));
          }
          return res.json({ data: card });
        });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('server error'));
    }
  }

  async cardLike(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user?._id;

    try {
      if (!cardId) {
        return next(ErrorHandler.badRequest('incorrect data'));
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
        return next(ErrorHandler.notFound('card not found'));
      }
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('server error'));
    }
  }

  async cardDislike(req: any, res: Response, next: NextFunction) {
    const { cardId } = req.params;
    const id = req.user?._id;

    try {
      if (!cardId) {
        return next(ErrorHandler.badRequest('incorrect data'));
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
        return next(ErrorHandler.notFound('card not found'));
      }
      return res.json({ data: card });
    } catch (error) {
      console.error(error);
      next(ErrorHandler.internal('server error'));
    }
  }
}

export default new CardsController();
