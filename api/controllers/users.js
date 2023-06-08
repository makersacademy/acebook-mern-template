// api/controllers/user.js  (should be authController.js)
// this file incl the logic to create a new user in the database. 
//the hashing operation isn't repeated  here because it's already done in 'api/models/user.js'
//the controller is not utilized yet but kept for potential future use and for adhering to mvc pattern

const bcrypt = require('bcrypt'); // adds import bcrypt
const User = require("../models/user");

const SignupUser =  async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation and error handling code
    //
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists, please try again.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation and error handling here
    //
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email and password' });
    }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email and password' });
  }
  //generate and send authntication token
  //
  res.status(200).json({ message: 'User logged in successfully' });
} catch (error) {
  res.status(500).json({ error: 'Internal server error' });
}
};

module
// // Define UsersController
// const UsersController = {
//   Create: async (req, res) => {
    
    
//     const user = new User(req.body);
//     try {
//       await user.save();
//       res.status(201).json({ message: 'OK' });
//     } catch (err) {
//       console.log(err); // Log the error
//       res.status(400).json({message: 'Bad request'});
//     }
//   },
// };

// Export UsersController
module.exports = UsersController;
