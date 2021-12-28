const express = require('express');
const {
    registerUser,
    logInUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
} = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(logInUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/password/update').put(isAuthenticated, updatePassword);

router.route('/me').get(isAuthenticated, getUserDetails);

router.route('/logout').get(logoutUser);

module.exports = router;
