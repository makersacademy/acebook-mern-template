const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  publicId: { type: String, required: true },
  userId: { type: String, required: true },
  postId: { type: String },
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
