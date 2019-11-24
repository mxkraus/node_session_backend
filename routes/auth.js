
const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

/** 
 * Signup
 * 
 */
router.get('/signup', authController.getSignup );
router.post('/signup', authController.postSignup );

/**
 * Login
 * 
 */
router.get('/login', authController.getLogin );
router.post('/login', authController.postLogin );

/**
 * Logout
 * 
 */
router.post('/logout', authController.postLogout );

module.exports = router;