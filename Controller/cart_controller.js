const cartModel = require('../Model/cart_model');

exports.addToCart = async (req,res) => {
    try{
        const {cartItem, quntity} = req.body;
        let isCart = await cartModel.findOne({cartItem: cartItem, user: req.user._id});
        if(isCart){
            return res.json("This item already in your Cart");
        }
        isCart = await cartModel.create({
            user: req.user._id,
            cartItem,
            quntity
        })
        isCart.save();
        res.status(201).json({cart: isCart, message: "Card added success"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}