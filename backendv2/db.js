const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);
console.log("Connected to MongoDB");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        trim: true
    },
    
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        trim: true
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 50,
        trim: true
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        trim: true
    }
    
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};