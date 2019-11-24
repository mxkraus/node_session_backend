module.exports = (req, res, next) => {
    if( !req.session.isLoggedIn ) {
        res.redirect('/login');
    }
    next(); // Allow Request to continue
}