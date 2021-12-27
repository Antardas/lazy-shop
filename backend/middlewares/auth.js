const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // If token not found throw error
    if (!token) {
        return next(new ErrorHandler('Please log in to access this resources', 401));
    }

    // if token found then checking token valid or invalid
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decodedData.id);
    console.log(req.user, 'from auth.js');
    next();
});

// Authorized Role Check
exports.authorizedRoles =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed access this Resources`, 403),
            );
        }
        next();
    };
