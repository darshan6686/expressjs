const userModel = require('../Model/user_model');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.signUp = async (req,res) => {
    try{
        let {firstName, lastName, email, password, gender} = req.body;
        let user = await userModel.findOne({email: email, isDelete:false});
        if(user){
            return res.json({message: "User already exists"});
        }
        let hashPassword = await bcrypt.hash(password, 10);
        user = await userModel.create({
            firstName, lastName, email,
            password: hashPassword,
            gender
        });
        user.save();
        res.status(201).json({user, message: "user is added"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}

exports.login = async (req,res) => {
    try{
        const {email, password} = req.body;
        let user = await userModel.findOne({email: email, isDelete: false});
        if(!user){
            return res.json({message: "user is not found"});
        }
        let checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.json({message: "password is not matched"});
        }
        let playload = {
            userId: user._id
        }
        let token = jwt.sign(playload,process.env.SECRCT_KEY);
        res.json({token, message: "Login success"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}

exports.getUser = async (req,res) => {
    try{
        // let user = await userModel.find({isDelete: false});
        res.json(req.user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}

exports.chagePassword = async (req,res) => {
    const { currentPassword, newPassword, confamePassword} = req.body;

    let checkPassword = await bcrypt.compare(currentPassword, req.user.password);
    if(!checkPassword){
        return res.json({message:"your Password is wrong."})
    }
    if(newPassword !== confamePassword){
        return res.json({message:"Your new password and confirm password are different."})
    }
    let hashedPassword = await bcrypt.hash(confamePassword, 10);
    let user = await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $set: {"password": hashedPassword}
        },
        {new: true}
    )
    res.json({user, message: "successfully change the password"});
}



exports.specificUser = async (req,res) => {
    try{
        let id = req.params.id;
        let user = await userModel.findOne({_id: id, isDelete:false});
        res.json(user);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}

exports.putuser = async (req,res) => {
    try{
        let user = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: { ...req.body }
            },
            {
                new: true
            }
        );
        user.save();
        res.json({user, message: "user data is updated..."});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}

exports.deleteUser = async (req,res) => {
    try{
        let id = req.params.id;
        let user = await userModel.findOne({_id:id, isDelete:false});
        if(!user){
            return res.json({message: "User Not Found! ..."});
        }
        // user = await userModel.findOneAndDelete({_id: id});

        user = await userModel.findByIdAndUpdate(user._id,{isDelete: true},{new: true} );
        res.json({message: "user data is deleted..."});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error..."});
    }
}