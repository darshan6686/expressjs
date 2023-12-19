const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    discription: String,
    price: Number,
    color: String,
    brand: String,
    isDelete: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('products', productSchema);