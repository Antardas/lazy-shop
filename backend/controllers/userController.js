const catchAsyncError = require('../middlewares/catchAsyncError'); // Instead repatative try catch block
const userModel = require('../models/userModels');
const generateToken = require('../routes/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Create a user
    const user = await userModel.create({
        name,
        email,
        password,
        avatar: { public_Id: 'this-is-public-id', url: 'this-is-public-url' },
    });
    generateToken(user, 201, res);
});

// Login a user

exports.logInUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if user has given password and email both
    if (!email || !password) return next(new ErrorHandler('Please Enter Email & password', 400));

    // Find user via email & user from DB
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) return next(new ErrorHandler('Invalid email & password', 401));

    const isPasswordMatch = await user.comparePassword(password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) return next(new ErrorHandler('Invalid email & password', 401));
    generateToken(user, 200, res);
});

// https://youtu.be/AN3t-OmdyKA?t=9063
