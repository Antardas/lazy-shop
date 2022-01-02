/*
❱❱❱
👉 Title ⇏ this file using controll all order realated api
👉 Description ⇏ All of these below code using you can manage orders API
👉 Author ⇏ Antar Das
👉 Date ⇏ 05-DEC-2021
❱❱❱
*/
// schema
const Order = require('../models/ordersModels');
const Product = require('../models/productsModel');
// Error Handler
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Order scaffolding
const order = {};
// new Product Order
order.newOrder = catchAsyncError(async (req, res, next) => {
    const {
 shippingInfo, orderItems, paymentInfo, taxPrice, shippingPrice, totalPrice 
} = req.body;

    const newOrder = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({ success: true, newOrder });
});

order.getSingleOrder  = catchAsyncError(async(req, res, next) => {
    
})

module.exports = order;
