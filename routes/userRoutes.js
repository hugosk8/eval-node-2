import express from 'express';
import { showDashboard, checkAuth } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/dashboard', checkAuth, showDashboard);

export default router;