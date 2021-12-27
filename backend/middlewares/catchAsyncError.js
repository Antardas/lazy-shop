// use this code avoid repeated code try & catch block
const catchAsyncError = (errorFunc) => (req, res, next) => {
    console.log('run-cat');
    Promise.resolve(errorFunc(req, res, next)).catch(next);
};

module.exports = catchAsyncError;
