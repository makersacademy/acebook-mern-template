const User = require("../models/user");

const UsersController = {
  Index: (req, res) => {
    const user_id = req.user_id

    User.findOne({_id: user_id}).then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "user id not found" });
      } else {
        res.status(201).json({username, firstName, lastName, _id})
      }
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
