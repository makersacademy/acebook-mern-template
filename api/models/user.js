const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const validateEmail = (email) => {
  const emailToCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailToCheck.test(email);
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'required'],
    validate: [validateEmail, "please use a valid email address"],
  },
  password: { type: String, required: [true, 'required'], minlength: [4, 'must be at least 4 characters long'], maxlength: 10 },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
