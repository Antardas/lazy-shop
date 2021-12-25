const mongoose = require('mongoose');

// Product Schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter Product Name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'please enter Product Description'],
    },
    price: {
        type: Number,
        required: true,
        maxLength: [8, 'Price Cannot Excced 8 Character'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_Id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, 'Please Enter Product Category'],
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Category'],
        maxLength: [4, 'Stock Cannot Excced 4 Character'],
        default: 1,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
            },
        },
    ],
    createAt: {
        type: Date,
        default: Date.now,
    },
});
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
