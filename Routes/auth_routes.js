const express = require('express');
const authRoute = express.Router();
const { upload } = require('../Helpers/imageUpload');
const authModel = require('../Model/auth');

// ------------ single images --------------

// authRoute.post('/image', upload.single('profileImage'), async (req,res) => {
//     // console.log(req.file);
//     if(req.file){
//         req.body.profileImage = `${req.file.path}`
//     }
//     let newAuth = await authModel.create({
//         ...req.body
//     })
//     newAuth.save();
//     res.json({authModel: newAuth});
// })

// ------------ Multiple images --------------

authRoute.post('/image', upload.array('profileImage', 5), async (req,res) => {
    let image = [];
    if(req.files){
        for(var i=0;i<req.files.length;i++){
            image[i] = `${req.files[i].path}`
        }
    }
    let newAuth = await authModel.create({
        profileImage: image,
        ...req.body
    })
    newAuth.save();
    res.json({authModel: newAuth});
})

module.exports = authRoute;