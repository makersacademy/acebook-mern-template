const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    // const user = new User(req.body);
    const {email, password, username} = req.body
    try {
      const user = await User.signup(email, password, username)

      res.status(201).json({email, user})
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  },
};

module.exports = UsersController;
