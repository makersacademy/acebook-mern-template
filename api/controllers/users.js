const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.signup(name, email, password);

      res.status(201).json({ message: "OK" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  },

  Index: async (req, res) => {
    // // Find all of the users from the user model
    // const userId = req.params.id;
    // const users = await User.findOne({_id: userId})
    // // Send a 200 response containing all users to the client
    // res.status(200).json(users)
  },
  GetUserInfo: async (req, res) => {
    // Find all of the users from the user model
    const userId = req.params.id;

    const user = await User.findOne({ _id: userId });
    // Send a 200 response containing all users to the client
    res.status(200).json({ user });
  },
  UpdateUserInfo: async (req, res) => {
    try {
      // Find the user by their ID
      const user = await User.findById(req.params.id);

      // Update the user's name with the new name provided in the request body
      user.name = req.body.name;

      // Save the updated user to the database
      await user.save();

      // Send a success response with the updated user information
      res.status(200).json({
        message: "User's name updated successfully",
        data: user,
      });
    } catch (error) {
      // Send a failure response with the error message
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = UsersController;
