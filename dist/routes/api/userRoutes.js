import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
const router = Router();
router.route('/').get(getUsers).post(createUser);
router.route('/:username').put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendsId').put(addFriend).delete(removeFriend);
export default router;
