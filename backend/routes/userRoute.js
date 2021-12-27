const express = require('express');
const { registerUser, logInUser, logoutUser } = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(logInUser);

router.route('/logout').get(logoutUser);

module.exports = router;
