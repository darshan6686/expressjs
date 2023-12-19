const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('users', userSchema);