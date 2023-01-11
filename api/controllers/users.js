const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);

      res.status(201).json({ message: 'OK'})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: error.message})
    }
  },
};

module.exports = UsersController;
