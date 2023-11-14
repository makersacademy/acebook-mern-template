// Importing mongoose
const mongoose = require("mongoose");

// Designing a schema for the user model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: {type: String, required: true},
  // Creating a one to many relationship to the same model
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: User, required: true}],
  photograph: {type: String},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: Post}],
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: Comment}]
});

const User = mongoose.model("User", UserSchema);


// Exporting the User model 
module.exports = User;



