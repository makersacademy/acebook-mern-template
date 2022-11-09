const User = require("../models/user");

const UsersController = {

  Index: (req, res) => {
    User.findOne({ _id: req.user_id }).then(async (user) => {
      res.status(201).json({ name: user.name, id: user._id });
    });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};

module.exports = UsersController;
