const mongoose = require("mongoose");
// Some tutorial videos require 'express',
// commented out as this isn't used in 'post' and 'user'
// const express = require("express-session")

const CommentSchema = new mongoose.Schema({
    commentText: { type: String, required: true }, 
    username: { type: String }
    // Post commented out for now to keep things simple 
    // post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // post_created: { type: Date, default: Date.now } 
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 