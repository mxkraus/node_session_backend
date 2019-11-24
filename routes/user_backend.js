
const express = require('express');

const backendController = require('../controllers/user_backend');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

/**
 * User Backend
 * 
 */
router.get('/manage-site', isAuth, backendController.getManageSite );
router.post('/manage-site', isAuth, backendController.postManageSite );

module.exports = router;