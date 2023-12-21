const express = require('express');
const userRoute = express.Router();
const {verifyToken} = require('../Helpers/tokenVerify')
const {
    signUp,
    login,
    getUser,
    chagePassword,
    putuser
} = require('../Controller/user_controller');

userRoute.post('/signup', signUp);

userRoute.post('/login', login);

userRoute.get('/profile', verifyToken, getUser);

// userRoute.get('/:id', specificUser);

userRoute.put('/update-profile', verifyToken, putuser);

userRoute.put('/changepassword', verifyToken, chagePassword)

// userRoute.delete('/:id', deleteUser);

module.exports = userRoute;