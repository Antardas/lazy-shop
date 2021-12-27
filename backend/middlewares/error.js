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

    res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
