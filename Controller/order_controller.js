const orderModel = require('../Model/order_model');
const cartModel = require('../Model/cart_model');

exports.addToOrder = async (req,res) => {
    try {
        let cartItem = await cartModel.find({user: req.user._id, isDelete: false}).populate('cartItem');
        // console.log(cartItem);

        let orderItem = cartItem.map((item) => ({
            cartItem: item.cartItem._id,
            quntity: item.quntity,
            price: item.cartItem.price
        }))
        // console.log(orderItem);

        let totalPrice = orderItem.reduce(((total, item) => total += (item.quntity * item.price)),0);
        // console.log(totalPrice);

        let newOrder = await orderModel.create({
            user : req.user._id,
            items : orderItem,
            totalAmount : totalPrice
        })
        newOrder.save();
        await cartModel.updateMany({user: req.user._id}, {isDelete: true});
        res.json({newOrder,message:"Added to Order Successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Interal Server Error"});
    }
}

exports.getAllOrder = async (req,res) => {
    try {
        let getOrder = await orderModel.find({user: req.user._id, isDelete: false});
        res.json(getOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateOrder = async (req,res) => {
    try {
        const {cartId, quntity} = req.body
        let data = await cartModel.findOne({cartItem: cartId, isDelete: true});
        if(!data){
            return res.json({message: "No Item In Your Order"});
        }
        data = await cartModel.updateOne(
            {cartItem: cartId},
            {
                $set: {quntity: quntity}
            },
            {new: true}
        )

        let cartItem = await cartModel.find({user: req.user._id, isDelete: true}).populate('cartItem');

        let orderItem = cartItem.map((item) => ({
            cartItem: item.cartItem._id,
            quntity: item.quntity,
            price: item.cartItem.price
        }))

        let totalPrice = orderItem.reduce(((total, item) => total += (item.quntity * item.price)),0);

        let updateOrder = await orderModel.findOneAndUpdate(
            {user: req.user._id},
            {
                $set:{
                    items: orderItem,
                    totalAmount: totalPrice
                }
            },
            {new:true}
        );
        updateOrder.save();
        res.json({updateOrder, message: "Order update is successfully"});

    } catch (err) {
        console.log(err);
        res.json({message: "Internal Server Error"});
    }
}

exports.deleteOrder = async (req,res) => {
    try {
        let data = await orderModel.find({user: req.user._id, isDelete: false});
        // console.log(data);
        if(!data){
            return res.json({message: 'No Active Orders Found!'})
        }
        let deleteOrder = await orderModel.updateOne(
            {user: req.user._id},
            {
                $set: { isDelete: true }
            },
            { new: true }
        )
    
        res.json({message: "order is deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}