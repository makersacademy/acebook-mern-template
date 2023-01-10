const User = require("../models/user");

const SessionsController = {

  Index: (req, res) => {
    User.findOne({ _id: req.user_id }).then(async (user) => {
      res.status(201).json({ name: user.name, id: user._id });
    });
  }
}

module.exports = SessionsController;
