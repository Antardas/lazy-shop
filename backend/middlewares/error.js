const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    let error = err;
    error.statusCode = err.statusCode || 500;
    error.message = err.message || 'Internal Server Error';

    // Handle Mongodb Wrong ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    // Mongoose Duplicate key error
    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(err?.keyValue)} Enter`;
        error = new ErrorHandler(message, 400);
    }

    // Handle Wrong  JWT token
    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token Invalid Try again';
        error = new ErrorHandler(message, 400);
    }

    // Handle   JWT token expire error
    if (err.name === 'TokenExpiredError') {
        const message = 'Json Web Token expired,  Try again';
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
