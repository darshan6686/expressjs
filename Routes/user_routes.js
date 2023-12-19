const express = require('express');
const userRoute = express.Router();
const {
    signUp,
    login,
    getUser,
    specificUser,
    putuser,
    deleteUser
} = require('../Controller/user_controller');

userRoute.post('/signup', signUp);

userRoute.post('/login', login);

// userRoute.get('/', getUser);

// userRoute.get('/:id', specificUser);

// userRoute.put('/:id', putuser);

// userRoute.delete('/:id', deleteUser);

module.exports = userRoute;