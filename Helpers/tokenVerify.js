const jwt = require('jsonwebtoken');
const userModel = require('../Model/user_model');

exports.verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"].split(' ')[1];
    // console.log(token);
    let {userId} = jwt.verify(token, process.env.SECRCT_KEY);
    // console.log(userId);
    req.user = await userModel.findById(userId);
    if(req.user){
        next();
    }
    else{
        res.json({message: "user invaild"});
    }
}