import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import { checkIfLoggedIn } from '../controllers/home.controller.js';

const router = express.Router();

router.use('/', checkIfLoggedIn);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;