export const checkAuth = (req, res) => {
    if (!req.session.UserId) {
        return res.redirect('/login');
    } 
    next();
};

export const showDashboard = (req, res) => {
    res.render('dashboard');
};