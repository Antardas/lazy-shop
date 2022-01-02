/*
❱❱❱
❱❱❱ Title ⇏ This module using you can access all order relate api
❱❱❱ Description ⇏
❱❱❱ Author ⇏ Antar Das
❱❱❱ Date ⇏ 05-DEC-2021
❱❱❱
*/

// Dependencies
const express = require('express');
const { newOrder } = require('../controllers/orderController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();
router.route('/order/new').post(isAuthenticated, newOrder);
module.exports = router;
