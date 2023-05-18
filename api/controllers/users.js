const User = require("../models/user");
const { validateEmail } = require("../helpers/validation");
const { validatePassword } = require("../helpers/validation");

const UsersController = {
  Create: (req, res) => { 
    const user = new User(req.body);
    // if email is ok
    if (!validateEmail(user.email)){
      res.status(400).json({
        message: 'Invalid email address!'
      })
       
      // if password is ok
    } else if (!validatePassword(user.password)) {
      res.status(400).json({
        message: 'Invalid password!'
      })
    } else {
      user.save((err) => {
        if (err) {
          res.status(400).json({message: 'Bad request'})    
        } else {
          res.status(201).json({ message: 'OK' });
        }
      });
    }   
  }
};

module.exports = UsersController;
