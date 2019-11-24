const ContentManager = require('../models/content_manager');

/**
 * Seitenverwaltung laden
 * 
 */
exports.getManageSite = (req, res, next) => {
    ContentManager.getContent( req.session.user.community ) 
        .then( ([rows, metaData]) => {
            res.render('backend/manage-site', {
                pageTitle: 'Seitenverwaltung',
                userInfo: req.session.user,
                siteInfo: rows[0],
                path: '/manage-site',
                role: req.session.loggedRole,
                isAuthenticated: req.session.isLoggedIn,
            });    
        })
        .catch( err => {
            console.log(err);
        })
}

/**
 * Einstellungen speichern
 */
exports.postManageSite = (req, res, next) => {

    const communityName = req.session.user.community; // Verwalteter Verein
    const curUser = req.session.user.email; // Letzter Änderer

    const descr = req.body.comDesc;

    ContentManager.getContent( communityName )
        .then(([rows, metaData]) => {
            return rows;
        })
        .then(rows => {

            if( rows.length === 0 ){
                // Noch kein Eintrag, speichere
                return ContentManager.saveContent( null, communityName, descr )
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                // Eintrag vorhanden, aktualisiere
                return ContentManager.updateContent( communityName, descr )
                    .catch( err => {
                        console.log(err);
                    })
            }

        })
        .then( result => {
            res.redirect('/manage-site');
        })
        .catch( err => {
            console.log(err);
        });
}