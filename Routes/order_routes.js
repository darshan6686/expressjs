const express = require('express');
const orderRoute = express.Router();
const {verifyToken} = require('../Helpers/tokenVerify');
const {
    addToOrder,
    getAllOrder,
    updateOrder,
    deleteOrder
} = require('../Controller/order_controller')

orderRoute.post('/add-order', verifyToken, addToOrder);
orderRoute.get('/get-order', verifyToken, getAllOrder);
orderRoute.put('/update-order', verifyToken, updateOrder);
orderRoute.delete('/delete-order', verifyToken, deleteOrder);

module.exports = orderRoute