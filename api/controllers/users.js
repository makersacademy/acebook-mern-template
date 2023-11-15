const { json } = require("express");
const User = require("../models/user");


const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
      //checks for any error
      if (err) {
        // checks for the specific error code for a duplicate unique key
        // changes the message acordingly we can use this to catch other errors if needed
        if(err.code === 11000){
         
          return res.status(400).json({message: 'This email is already registered with an account'})
          


        }
        return res.status(400).json({ message: 'Bad request' });
        

      }
      else {
        res.status(201).json({ message: 'OK' });
        
      }
    });
  },
};

module.exports = UsersController;
