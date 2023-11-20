const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const userEmail = req.body.email;
    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
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
};

module.exports = UsersController;
