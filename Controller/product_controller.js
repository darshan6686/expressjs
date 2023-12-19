const productModel = require('../Model/product_model');

exports.getProduct = async (req,res) => {
    try{
        let product = await productModel.find({isDelete: false});
        res.json(product);
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassge: "Internal server error..."});
    }
};

exports.postProduct = async (req,res) => {
    try{
        let {title, discription, price, color, brand} = req.body;
        let product = await productModel.findOne({title: title, isDelete: false});
        if(product){
            return res.json({meassge: "Product is already exits..."});
        }
        product = await productModel.create({
            title, discription, price, color, brand
        });
        product.save();
        res.json({meassge: "product is added", product});
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassge: "Internal server error..."});
    }
};

exports.specificProduct = async (req,res) => {
    try{
        let id = req.params.id;
        let product = await productModel.findOne({_id:id, isDelete: false});
        // let product = await productModel.findById(id, {isDelete: false});
        res.json(product);
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassge: "Internal server error..."});
    }
};

exports.putProduct = async (req,res) => {
    try{
        let id = req.params.id;
        // let product = await productModel.findById(id, {isDelete: false});
        let product = await productModel.findOne({_id: id, isDelete: false});
        if(!product){
            return res.json({meassge: "product is not found..."})
        }
        product = await productModel.findOneAndUpdate(
            {_id: id},
            {
                $set: { ...req.body }
            },
            {
                new: true
            }
        )
        product.save();
        res.json({product, meassge: "product is updated..."});
   }
   catch(err){
        console.log(err);
        res.status(500).json({meassge: "Internal server error..."});
   }
};

exports.deleteProduct = async (req,res) => {
    try{
        let id = req.params.id;
        // let product = await productModel.findById(id, {isDelete: false});
        let product = await productModel.findOne({_id: id, isDelete: false});
        if(!product){
            return res.json({meassge: "product is not found..."});
        }

        // product = await productModel.findOneAndDelete({_id: id});

        product = await productModel.findByIdAndUpdate(product._id,{isDelete: true},{new: true} )
        res.json({meassge: "product is deleted..."});
    }
    catch(err){
        console.log(err);
        res.status(500).json({meassge: "Internal server error..."});
    }
};