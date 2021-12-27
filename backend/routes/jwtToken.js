// Create Token and saving cookie
const generateToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    const options = {
        expires: new Date(Date.now + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(200).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = generateToken;
