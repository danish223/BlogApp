const express = require('express');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const router = express.Router();


// GET all the users
router.get('/', userController.getAllUser);




// Signup
router.post('/signup', authController.signup);
// Login
router.post('/login', authController.login);

module.exports = router;