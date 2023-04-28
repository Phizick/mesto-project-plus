import { Router } from 'express';
import CardController from '../controllers/cards';

const router = Router();

router.get('/', CardController.getAllCards);
router.post('/', CardController.createCard);
router.delete('/:cardId', CardController.removeCard);
router.put('/:cardId/likes', CardController.cardLike);
router.delete('/:cardId/likes', CardController.cardDislike);

export default router;
