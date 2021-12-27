const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

// Crate a user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please Enter your Name'],
        minLength: [4, 'Name Should have more than 4 character'],
        maxLength: [30, 'Name Cannot Excced More than 30 character'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [8, 'Password Should be greater than 8 character'],
        maxLength: [32, 'Password Cannot Excced More than 30 character'],
        select: false,
    },
    avatar: {
        public_Id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// change normal password to hash password

userSchema.pre('save', async function (next) {
    // if password didn't change
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compared Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    const comparePass = await bcrypt.compare(enteredPassword, this.password);
    return comparePass;
};

// Create a model

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
