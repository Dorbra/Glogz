const mongoose = require('mongoose');

// Creating a Schema for User
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'This field is required!'],
        unique: true,
        trim: true,
        minlength: 2,
    },
    password: {
        type: String,
        required: [true, 'Must provide Password']
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    registered_at: {
        type: Date,
        default: Date.now
    }
});

// Creating a Model for User
const User = mongoose.model('User', UserSchema);
module.exports = User;