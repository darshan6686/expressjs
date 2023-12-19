const express = require('express');
const productRoute = express.Router();
const {
    postProduct,
    getProduct,
    specificProduct,
    putProduct,
    deleteProduct
} = require('../Controller/product_controller')


productRoute.get('/', getProduct)

productRoute.post('/', postProduct)

productRoute.get('/:id', specificProduct)

productRoute.put('/:id', putProduct)

productRoute.delete('/:id', deleteProduct)

module.exports = productRoute;