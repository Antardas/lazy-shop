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
