const { default: mongoose } = require('mongoose');
const cartModel = require('../Model/cart_model');
const productModel = require('../Model/product_model');

exports.addToCart = async (req,res) => {
    try{
        const {cartItem, quntity} = req.body;
        let isCart = await cartModel.findOne({cartItem: cartItem, user: req.user._id, isDelete: false});
        if(isCart){
            return res.json({ message: "This item already in your Cart"});
        }
        isCart = await cartModel.create({
            user: req.user._id,
            cartItem,
            quntity
        })
        let isProduct = await productModel.find({_id: cartItem, isDelete: false});
        if(!isProduct){
            return res.send({ message: "You don't have this Product"})
        }
        isCart.save();
        res.status(201).json({cart: isCart, message: "Card added success"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getAllCarts = async (req,res) => {
    try{
        let allCarts = await cartModel.find({user: req.user._id, isDelete: false})
        res.json(allCarts);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getCart = async (req,res) => {
    try{
        let id = new mongoose.Types.ObjectId(req.query.cartId);
        let cartItem = await cartModel.findOne({_id: id, isDelete: false});
        // let cartItem = await cartModel.findById(id);
        if(!cartItem){
            return res.json({message: "cart not found"});
        }
        res.json(cartItem);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.update = async (req,res) => {
    try{
        let {quntity, cartId} = req.body
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false});
        cartItem = await cartModel.findOne({_id: cartId, isDelete: false});
        if(!cartItem){
            return res.json({message: "No Item In Your Card"});
        }
        cartItem = await cartModel.findByIdAndUpdate(
            cartId,
            {
                $set: {quntity: quntity}
            },
            {new: true}
        )
        cartItem.save();
        res.json({cartItem, message: "cart is updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server Error"});
    }
}

exports.deleteCart = async (req,res) => {
    try{
        let {cartId} = req.body
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false});
        cartItem = await cartModel.findOne({_id: cartId, isDelete: false});
        if(!cartItem){
            return res.json({message: "No Item In Your Card"});
        }
        cartItem = await cartModel.findByIdAndUpdate(
            cartId,
            {
                $set: {isDelete: true}
            },
            {new: true}
        )

        res.json({cartItem, message: "cart is deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server Error"});
    }
}