const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: {type: Number, required: false},
  avatarUrl: { 
    type: String, 
    default: './images/defaultAvatar.png',
    required: true 
  }
});

UserSchema.pre('save', function (next) {
  if (!this.id) {
    // Find the highest existing ID value and add 1 to it
    User.findOne().sort('-id').exec((err, user) => {
      if (err) {
        return next(err);
      }
      this.id = (user && user.id || 0) + 1;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
