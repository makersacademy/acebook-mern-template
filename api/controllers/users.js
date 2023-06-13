const User = require("../models/user");
const bcrypt = require("bcrypt");

const UsersController = {
  Create: (req, res) => {
    const checkEmail = req.body.email;
    
    User.findOne({ email: checkEmail }).then((user) => {
      if (user ) {
        console.log('Email already signed up')
        res.status(400).json({message: 'Email already signed up'})
      } else {
        const user = new User(req.body);
        user.save((err) => {
          if (err) {
            res.status(400).json({message: 'Bad request'})
          } else {
            res.status(201).json({ message: 'OK' });
          }
        });
      }
    })
  },

  //This gets the user's username based on their userId
  // Find the user by their userId and retrieve only the 'username' field
  // If an error is found sends a (plain text) response with a status of 400 (Bad Request)
  // If a user is found, sends a response with a status of 200 (OK) and the retrieved username
  // If a user is not found, sends a response with a status of 404 (Not Found)
  GetUsername: (req, res) => {
    const { user_Id } = req.params;

    User.findById(user_Id, 'username', (err, user) => {
      if (err) {
        
        res.status(400).send({ message: 'Bad request' });
      } else {
        if (user) {
          res.status(200).send({ username: user.username });  //can use .send instead of returning the json object
        } else {
          res.status(404).send({ message: 'User not found' });
        }
      }
    });
  },
};

module.exports = UsersController;
