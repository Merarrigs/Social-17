import { Router } from 'express';
import thoughRoutes from './thoughtRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();
router.use('/thoughts', thoughRoutes);
router.use('/users', userRoutes);

export default router;