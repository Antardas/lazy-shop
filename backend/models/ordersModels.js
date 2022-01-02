/*
❱❱❱
❱❱❱ Title ⇏ This is Order Schome or Schema file
❱❱❱ Description ⇏ using this file save correctly user data on databse
❱❱❱ Author ⇏ Antar Das
❱❱❱ Date ⇏ 30-DEC-2021
❱❱❱
*/
const mongoose = require('mongoose');
// create a order schema
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNum: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: mongoose.Schema.ObjectId, ref: 'products', required: true },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    taxPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    shippingPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true,
    },
    ordersStatus: {
        type: String,
        required: true,
        default: 'Processing',
    },
    deliverDate: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Orders', orderSchema);
