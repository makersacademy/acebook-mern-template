const User = require("../models/user");

function isValidPassword(password) {
  // Password must be 8 characters or more, contain a special character, and have at least 1 number
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return passwordRegex.test(password);
}


const UsersController = {
  Create: async (req, res) => {
    const { email, password, retypePassword, firstName, lastName } = req.body;

    if (!firstName || !lastName || !email || !password || !retypePassword) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message: 'Password must be 8 characters or more, contain a special character, and have at least 1 number',
      });
    }


    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
};



// Email is already registered 
// All fields must be filled
// password conditions:
    // passwords do not match
    // Passwords do not match
    // Password must be 8 characters or more, contain a special character, and have at least 1 number


module.exports = UsersController;
