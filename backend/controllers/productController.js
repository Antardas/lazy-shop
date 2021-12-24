const productCollection = require('../models/productsModel');

// Create Product
exports.createProduct = async (req, res, next) => {
    const product = await productCollection.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
};

// ------------ Read Single Products
exports.getOneProduct = async (req, res, next) => {
    const product = await productCollection.findById(req.params.id.match(/^[0-9a-fA-F]{24}$/));
    console.log(req.params.id);
    if (product) {
        res.status(200).json({ success: true, product });
    } else {
        res.status(500).json({ success: false, message: 'Product Not Found' });
    }
};

// ---------------Read All Producs
exports.getAllProducts = async (req, res) => {
    const products = await productCollection.find();
    console.log(products);
    res.status(200).json({
        success: true,
        products,
    });
};

// --------------- Update Product --  Admin
exports.updateProduct = async (req, res) => {
    let product = await productCollection.findById(req.params.id);
    if (product) {
        product = await productCollection.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({ success: true, product });
    } else {
        res.status(500).json({
            success: false,
            message: 'Product Not Found',
        });
    }
};

// ------------ Delete Product --Admin
exports.deleteProduct = async (req, res, next) => {
    const product = await productCollection.findById(req.params.id);
    console.log(product);
    if (product) {
        await product.remove();
        res.status(200).json({ success: true, message: 'Deleted Product Succesfully' });
    } else {
        res.status(500).json({
            success: false,
            message: 'Product Not Found',
        });
    }
};
