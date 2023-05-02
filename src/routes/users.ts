import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.get('/me', UserController.getUserInfo);
router.patch('/me', UserController.updateUserInfo);
router.patch('/me/avatar', UserController.updateUserAvatar);
export default router;
