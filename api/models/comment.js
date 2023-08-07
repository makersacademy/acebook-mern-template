const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: { type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // post: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    //     required: true
    // }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;