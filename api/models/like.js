const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  count: Array
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;