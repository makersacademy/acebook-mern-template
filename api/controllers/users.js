const User = require("../models/user");

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

// stop user from signing up with existing email 
// fill all fields to signup
// password conditions, password match 
// return 400 error

module.exports = UsersController;
