const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const CommentSchema = new mongoose.Schema({
  user_id: String,
  content: String
},{timestamps:true});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = {Comment,CommentSchema};
