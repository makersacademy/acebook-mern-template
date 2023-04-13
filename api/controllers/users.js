const User = require("../models/user");
const bcrypt = require('bcrypt')

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password } = req.body;

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

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
