const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  createdDateTime: Date
})

module.exports = CommentSchema;