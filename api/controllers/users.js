const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    const { email } = req.body;

    // Check if the email already exists in the database
    User.findOne({ email }, (err, existingUser) => {
      if (err) {
        // Handle any database error
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      if (existingUser) {
        // Email already exists, return an error message
        return res.status(401).json({ message: 'Email already in use' });
      }

      // Email is unique, create a new user
      const user = new User(req.body);
      user.save((err) => {
        if (err) {
          // Handle any database error
          return res.status(400).json({ message: 'Internal Server Error' });
        }
        
        // User successfully created
        return res.status(201).json({ message: 'User created' });
      });
    });
  },
};

module.exports = UsersController;





