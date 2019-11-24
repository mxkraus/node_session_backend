const Community = require('../models/community');

const axios = require('axios');
const request = require('request');


/**
 * Übersichtsseite für Verein darstellen
 * 
 *  - Stellt alle Vereine dar, die in der DB gespeichert sind
 * 
 */
exports.getCommunities = (req, res, next) => {
    Community.getAll()
        // Destrucuring - Pull Out Data from a value that is recieved as an argument
        // like (example) => {}, but splitted in separate values
        .then(([rows, fieldData]) => {
            res.render('admin/communities', {
                comms: rows,
                pageTitle: 'Vereinsübersicht',
                path: '/communities',
                role: req.session.loggedRole,
                isAuthenticated: req.session.adminLoggedIn,
            });
        })
        .catch(err => console.log(err));
};

/**
 * Seite aufrufen um Verein hinzufügen zu können
 * 
 *  - Zeigt einfahc nur Formular an
 *
 */
exports.getAddCommunity = (req, res, next) => {
    res.render('admin/edit-community', {
        pageTitle: 'Verein hinzufügen',
        path: '/admin/add-community',
        editing: false,
        role: req.session.loggedRole,
        isAuthenticated: req.session.adminLoggedIn,
    });
};

/**
 * Verein der hinzugefügt werden soll verarbeiten
 * 
 *  - Speichert den neuen Verein in die Datenbank
 */
exports.postAddCommunity = (req, res, next) => {
    const comName = req.body.comName;
    const comPass = req.body.comPass;
    const com     = new Community( null, comName, comPass );
    com.save()
        .then(() => {
            res.redirect('/admin/communities');
        })
        .catch(err => console.log(err));

};

/**
 * Behandelt Ereignis wenn Verein bearbeitet werden soll
 * 
 *  - Zeigt Informationen zur Bearbeitung an
 * 
 */
exports.getEditCommunity = (req, res, next) => {

    const editMode = req.query.edit;
    if(!editMode){
        req.redirect('/');
    };

    const comId = req.params.comId;
    Community.getById( comId )
        .then( ([community]) => {
            if (!community[0]) {
                return res.redirect('/');
            }
            res.render('admin/edit-community', {
                pageTitle: 'Verein bearbeiten',
                path: '/admin/edit-community',
                editing: editMode,
                community: community[0],
                role: req.session.loggedRole,
                isAuthenticated: req.session.adminLoggedIn,
            });
        })
        .catch( err => console.log(err) );
};

/**
 * Speichert geänderten Verein in Datenbank
 * 
 */
exports.postEditCommunity = (req, res, next) => {
    const comName = req.body.comName;
    const comPass = req.body.comPass;
    const comId   = req.body.comId;

    const comUpdated = new Community( comId, comName, comPass );
    comUpdated.update();

    res.redirect('/admin/communities');
};

/**
 * Löscht markierten Verein aus Datenbank
 * 
 */
exports.postDeleteCommunity = (req, res, next) => {
    const comId = req.body.comId;
    Community.deleteById( comId )
        .then( data => {
            res.redirect('/admin/communities');
        })
        .catch( err => console.log(err) );
}

/**
 * Syncronisiert Vereine mit Vereinskartell
 * 
 */
exports.getSyncCommunities = (req, res, next) => {

    axios.get('https://mxkraus.de/Vereinskalender/get_events.1.php')
        .then( result => {

            // Liefert die Daten vom GET-Rquest ans Vereinskartell
            return cartelData = result.data;

        })
        .then( data => {

            Community.saveMultiple( data )
                .then( result => {
                    res.redirect('/admin/communities');
                })   
                .catch( err => console.log(err) );

        })
        .catch( err => console.log(err) );

}
