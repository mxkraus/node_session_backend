
const express = require('express');

const frontController = require('../controllers/frontend');

const router = express.Router();

/**
 * Startseite
 * 
 */

router.get('/', frontController.getMainPage );


module.exports = router;