const User = require('../models/user');

const UsersController = {
  Create: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      display_name: req.body.display_name,
    });

    if (req.file) {
      user.image = req.file.buffer;
    }

    user.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Bad request' });
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};

module.exports = UsersController;
