const express = require('express');
const {
    registerUser,
    logInUser,
    logoutUser,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(logInUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

module.exports = router;
