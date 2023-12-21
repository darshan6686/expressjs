const express = require('express');
const cartRoute = express.Router();
const {verifyToken} = require('../Helpers/tokenVerify');
const {
    addToCart
} = require('../Controller/cart_controller')

cartRoute.post('/add-cart', verifyToken, addToCart);

module.exports = cartRoute