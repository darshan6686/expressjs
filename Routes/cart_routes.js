const express = require('express');
const cartRoute = express.Router();
const {verifyToken} = require('../Helpers/tokenVerify');
const {
    addToCart,
    getAllCarts,
    getCart,
    update,
    deleteCart
} = require('../Controller/cart_controller')

cartRoute.post('/add-cart', verifyToken, addToCart);
cartRoute.get('/getAllcart', verifyToken, getAllCarts);
cartRoute.get('/get-cart', verifyToken, getCart);
cartRoute.put('/update-cart', verifyToken, update);
cartRoute.delete('/delete-cart', verifyToken, deleteCart);

module.exports = cartRoute