import { Router } from 'express';
const router = Router();
import { getThoughts, createThought, getThoughtById, updateThought, deleteThought, addReaction, deleteReaction } from '../../controllers/thoughtController.js';
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
export default router;
