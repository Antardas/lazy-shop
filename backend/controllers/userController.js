/* eslint-disable consistent-return */
const crypto = require('crypto');
const catchAsyncError = require('../middlewares/catchAsyncError'); // Instead repatative try catch block
const User = require('../models/userModels');
const generateToken = require('../routes/jwtToken');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');
// Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {
    console.log('fromRegisterUser');
    const { name, email, password } = req.body;

    // Create a user
    const user = await User.create({
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
    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorHandler('Invalid email & password', 401));

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return next(new ErrorHandler('Invalid email & password', 401));
    generateToken(user, 200, res);
});

// Log out user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'Log Out successFully',
    });
});

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    // Get reset password token
    const resetToken = user.getResetPasswordToken();

    user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/password/reset/${resetToken}`;
    const message = `your Reset password Token is :- \n\n ${resetPasswordUrl} \n\n if you have not request this email then Please Ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email Send to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});

// Reset password using token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Creating Hash Token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler('Token invalid or token expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password didn't match", 400));
    }
    console.log(req.body);
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    generateToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
});

// Update user Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
        return next(new ErrorHandler('Old password is incorrenct', 400));
    }

    if (req.body.newPassword !== req.body.newConfirmPassword) {
        return next(new ErrorHandler('confirm password is incorrenct', 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    generateToken(user, 200, res);
});

// Update User Profile

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // We will cloudnari leter
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
});

// Get all user -- Admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// Get single User -- Admin

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json({ success: true, user });
});

// Update User role -- Admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({ success: true, user });
});

// Delete user -- Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler('User Not Found', 400));
    }

    await user.remove();
    res.status(200).json({ success: true, user });
});
