import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

export default router;