module.exports = (req, res, next) => {
    if( !req.session.adminLoggedIn ) {
        res.redirect('/admin');
    }
    next(); // Allow Request to continue
}