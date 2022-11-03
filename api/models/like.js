const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  count: Array
});

const Like = mongoose.model("Like", LikeSchema); //passing the name like and also the like schema created above

module.exports = Like;

