const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    profileImage: [{
        type: String
    }],
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('auths', authSchema);