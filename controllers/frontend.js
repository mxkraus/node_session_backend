
/**
 * Startseite anzeigen
 * 
 */
exports.getMainPage = (req, res, next) => {
    res.render('frontend/main', {
        pageTitle: 'Startseite',
        path: '/',
        role: req.session.loggedRole,
        isAuthenticated: req.session.isLoggedIn
    });
}