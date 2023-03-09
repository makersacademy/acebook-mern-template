const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const user = new User(req.body);
    await user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};

module.exports = UsersController;
