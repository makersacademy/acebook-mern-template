const User = require("../models/user");

const UsersController = {
  Create: async (req, res) => {  //defines a method called "Create" that is an asynchronous function and takes two parameters: "req" and "res", which represent the request and response objects.
    const { email } = req.body; // extracts the email property from the request body
    const existingUser = await User.findOne({ email }); //queries the database to see if a user with the provided email already exists.
                                                        // It uses the User model to find a document in the database that matches the provided email.
    
    if (existingUser) {
      return res.status(409).json({ message: 'Email address already in use' });
    }  //condition checks if the user with the provided email already exists. If it does, it returns a response with a 409 status code and a message indicating that the email address is already in use.
    
    const user = new User(req.body); // creates a new instance of the user model and with the request body as data
    user.save((err) => {             // saves the user
      if (err) {
        return res.status(400).json({ message: 'Bad request' });  // if there was an error whilst saving, it will return a 400 status with the message 'Bad request'
      } else {
        return res.status(201).json({ message: 'OK' }); // else if the save is successfull, it will return a 201 status and an 'OK' message
      }
    });
  },
};

module.exports = UsersController;
