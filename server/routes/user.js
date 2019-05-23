const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// In the frontend will be /api/user/signupCheck
// Check if user already is in the db
router.post('/signupCheck', userController.checkIfUserExists);

// In the frontend will be /api/user/signup
// Saves user in the db
router.post('/signup', userController.createUser);

// In the frontend will be /api/user/login
router.post('/login', userController.userLogin);

module.exports = router
