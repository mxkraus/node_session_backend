
/**
 * Admin Login
 * 
 */
exports.getLogin = (req, res, nest) => {
    res.render('auth/login', {
        pageTitle: 'Admin Login',
        path: '/admin',
        role: 'admin',
        isAuthenticated: req.session.adminLoggedIn
    });
}

/**
 * Admin Dashboard anzeigen
 * 
 */
exports.getDashboard = (req, res, nest) => {
    console.log(req.session.user);
    res.render('admin/dashboard', {
        pageTitle: 'Admin Dashboard',
        path: '/admin/dashboard',
        role: req.session.loggedRole,
        isAuthenticated: req.session.adminLoggedIn
    });
}