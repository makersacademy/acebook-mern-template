const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        console.log( `User is: ${user}`)
        res.status(409).json({message: 'Email already exists'});
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
  }
};

module.exports = UsersController;
