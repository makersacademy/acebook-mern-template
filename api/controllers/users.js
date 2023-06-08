const User = require("../models/user");

const UsersController = {
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

  //This gets the user's username based on their userId
  // Find the user by their userId and retrieve only the 'username' field
  // If an error is found send a JSON response with a status of 400 (Bad Request)
  // If a user is found, send a JSON response with a status of 200 (OK) and the retrieved username
  // If a user is not found, send a JSON response with a status of 404 (Not Found)
  GetUsername: (req, res) => {
    const { user_Id } = req.params;

    User.findById(user_Id, 'username', (err, user) => {
      if (err) {
        
        res.status(400).json({ message: 'Bad request' });
      } else {
        if (user) {
          res.status(200).json({ username: user.username });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      }
    });
  }
};

module.exports = UsersController;
