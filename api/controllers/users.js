const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },

  ChangeAvatar: async (req, res) => {
    const filename = req.body.filename;
    const user_email = req.body.user_email;

    // Check if the request contains avatar filename and user id
    if (!filename || !user_email) {
      return res.status(400).json({ message: "Bad request" });
    }

    // Change avatar with new filename
    const result = await User.findOneAndUpdate(
      { email: user_email },
      { $set: { avatar: filename } },
    );

    // Check if the user was found and updated successfully
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a 201 response indicating success
    res.status(201).json({ message: "OK" });
  },
  GetUserEmails: async (req, res) => {
    User.find({}, 'email', (err, users) => {
      if (err){
        throw err;
      }
      else{
        res.status(200).json(users);
      }
    });
  },
};

module.exports = UsersController;
