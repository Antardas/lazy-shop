const express = require('express');
const {
    registerUser,
    logInUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUserProfile,
    getAllUsers,
    getSingleUser,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController');
const { isAuthenticated, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(logInUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/password/update').put(isAuthenticated, updatePassword);

router.route('/me').get(isAuthenticated, getUserDetails);

router.route('/me/update').get(isAuthenticated, updateUserProfile);

router.route('/logout').get(logoutUser);

router.route('/admin/allUsers').get(isAuthenticated, authorizedRoles('admin'), getAllUsers);

router
    .route('/admin/user/:id')
    .get(isAuthenticated, authorizedRoles('admin'), getSingleUser)
    .put(isAuthenticated, authorizedRoles('admin'), updateUserRole)
    .delete(isAuthenticated, authorizedRoles('admin'), deleteUser);

module.exports = router;
