const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          res.status(409).json({ message: "Email already exists. Please choose a different email." });
        } else {
          res.status(400).json({ message: "Bad request" });
        }
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
};

module.exports = UsersController;
