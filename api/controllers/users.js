const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    if (req.file) {
      req.body.image = req.file.path;
    }
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
    User.findById(req.user_id, (err, user) => {
      if (err || !user) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(200).json({ user });
      }
    });
  },
};

module.exports = UsersController;
