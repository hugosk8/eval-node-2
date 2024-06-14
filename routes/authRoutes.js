import express from 'express';
import { showRegisterForm, registerUser, showLoginForm, loginUser, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/register', showRegisterForm);
router.post('/register', registerUser);
router.get('/login', showLoginForm);
router.post('/login', loginUser);
router.get('/logout', logout);

export default router;