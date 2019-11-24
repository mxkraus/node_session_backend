
const express = require('express');

const comController = require('../controllers/communities');
const adminController = require('../controllers/admin');
const isAdminAuth = require('../middleware/is-admin-auth');

const router = express.Router();

/**
 * Admin Dashboard
 * 
 */

router.get('/', adminController.getLogin );

router.get('/dashboard', isAdminAuth, adminController.getDashboard );

/**
 * Vereinsübersicht verwalten
 * 
 */

// Verein Verarbeitung
router.get('/communities', isAdminAuth, comController.getCommunities ); // Alle anzeigen

router.get('/add-community', isAdminAuth, comController.getAddCommunity ); // hinzufügen
router.post('/add-community', isAdminAuth,  comController.postAddCommunity ); // hinzufügen

router.get('/edit-community/:comId', isAdminAuth, comController.getEditCommunity ); // bearbeiten
router.post('/edit-community', isAdminAuth, comController.postEditCommunity ); // Bearbeitung speichern

router.post('/delete-community', isAdminAuth, comController.postDeleteCommunity ); // Verein löschen

// Syncronisierung mit Vereinskartell 
router.get('/sync-communities', isAdminAuth, comController.getSyncCommunities ); // syncronisieren


module.exports = router;