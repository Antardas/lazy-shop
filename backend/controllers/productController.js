const catchAsyncError = require('../middlewares/catchAsyncError'); // Instead repatative try catch block
const Product = require('../models/productsModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

// ------------ Read Single Products
exports.getOneProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id.match(/^[0-9a-fA-F]{24}$/));
    console.log(req.params.id);
    if (product) {
        res.status(200).json({ success: true, product });
    } else {
        next(new ErrorHandler('Product Not Found', 500));
    }
});
// ---------------Read All Producs
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const limitPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(limitPerPage);
    const products = await apiFeatures.query;
    console.log(products.length);
    res.status(200).json({
        success: true,
        products,
        productCount,
    });
});

// --------------- Update Product --  Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (product) {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({ success: true, product });
    } else {
        next(new ErrorHandler('Product Not Found', 404));
    }
});

// ------------ Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (product) {
        await product.remove();
        res.status(200).json({ success: true, message: 'Deleted Product Succesfully' });
    } else {
        next(new ErrorHandler('Product Not Found', 500));
    }
});

// Create new review or update the review

exports.createReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
        return next(ErrorHandler('Product Not Found', 404));
    }
    const isReviewd = product.reviews.find((reviews) => {
        if (reviews.user && reviews.user.toString() === req.user._id.toString()) {
            reviews.rating = rating;
            reviews.comment = comment;
            console.log(review, __filename);
            return true;
        }
        return false;
    });
    if (!isReviewd) {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
        console.log(isReviewd, 'isReviewd');
    }
    let ratingsAvg = 0;
    const totalReviewCount = product.reviews.forEach((rev) => {
        ratingsAvg += rev.rating;
    });
    console.log(totalReviewCount);
    product.ratings = (ratingsAvg / product.reviews.length).toFixed(1);
    console.log(product.ratings);
    await product.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, product });
});

// Get all reviews of a product
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
});
// Delete Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

});
