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

  Find: (req, res) => {
    const email = req.query.email;
    User.findOne({ email: email }, "-password", (err, user) => {
      if (err) {
        res.status(500).json({ message: "Error finding the user" });
      } else if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ user });
      }
    });
  },
};

module.exports = UsersController;
