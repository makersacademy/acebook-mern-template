const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.signup(name, email, password);

      res.status(201).json({ message: 'OK'})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: error.message})
    }
  },

  Index: async (req, res) => {
    // Find all of the users from the user model 
    const users = await User.find({})
    // Send a 200 response containing all users to the client 
    res.status(200).json(users)
  }
  
};

module.exports = UsersController;
