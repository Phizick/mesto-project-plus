import { Router } from 'express';
import CardController from '../controllers/cards';
import { createCardValidation, getCardValidation } from '../validation/cardValidation';

const router = Router();

router.get('/', CardController.getAllCards);
router.post('/', createCardValidation, CardController.createCard);
router.delete('/:cardId', getCardValidation, CardController.removeCard);
router.put('/:cardId/likes', getCardValidation, CardController.cardLike);
router.delete('/:cardId/likes', getCardValidation, CardController.cardDislike);

export default router;
