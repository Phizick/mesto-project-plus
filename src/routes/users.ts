import { Router } from 'express';
import UserController from '../controllers/users';
import {
  getUserByIdValidation,
  updateUserAvatarValidation,
  updateUserInfoValidation,
} from '../validation/userValidation';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', getUserByIdValidation, UserController.getUserById);
router.get('/me', UserController.getUserInfo);
router.patch('/me', updateUserInfoValidation, UserController.updateUserInfo);
router.patch('/me/avatar', updateUserAvatarValidation, UserController.updateUserAvatar);
export default router;
