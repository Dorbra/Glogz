const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {
        type: String
        /* type: mongoose.Schema.Types.ObjectId,
        ref: "User" */
    },
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    body: {
        type: String,
        required: [true, "Add post body"],
        default: "Cool Post"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;