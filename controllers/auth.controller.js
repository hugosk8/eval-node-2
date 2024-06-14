import User from '../models/User.model.js';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const showRegisterForm = (req, res) => {
    res.render('register');
};

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.render('register', { error: 'Tous les champs sont obligatoires' });
    } else if (password !== confirmPassword) {
        return res.render('register', { error: 'Les mots de passe ne correspondent pas' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.render('register', { error: 'L\'utilisateur existe déjà' });
    }

    const hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
                        .update(password)
                        .digest('hex');
    
    const newUser = new User({ firstName, lastName, email, password: hash });
    await newUser.save();
    res.redirect('/auth/login');
};

export const showLoginForm = (req, res) => {
    res.render('login');
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Tentative de connexion avec:', email, password);

    if (!email || !password) {
        console.log('Tous les champs sont obligatoires');
        return res.render('login', { error: 'Tous les champs sont obligatoires' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        console.log('Utilisateur introuvable');
        return res.render('login', { error: 'Utilisateur introuvable' });
    }

    const hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
                        .update(password)
                        .digest('hex');
    
    if (hash !== user.password) {
        console.log('Mot de passe incorrect');
        return res.render('login', { error: 'Mot de passe incorrect' });
    } else {
        req.session.userId = user._id;
        console.log('Connexion réussie, redirection vers le tableau de bord');
        res.redirect('/auth/login?redirect=true');
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/user/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/auth/login');
    });
};