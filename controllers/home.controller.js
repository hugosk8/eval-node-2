export const checkIfLoggedIn = (req, res, next) => {
    if (req.path === '/' && req.session.userId) {
        return res.redirect('/user/dashboard');
    } else if (req.path === '/') {
        return res.render('home');
    }
    next();
};
