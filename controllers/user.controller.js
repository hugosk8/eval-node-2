export const checkAuth = (req, res) => {
    if (!req.session.UserId) {
        return res.redirect('/auth/login');
    } 
    next();
};

export const showDashboard = (req, res) => {
    res.render('dashboard');
};