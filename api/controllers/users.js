const bcrypt = require('bcrypt')
const User = require("../models/user");

const UsersController = {
  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.status(409).json({message: 'Email already exists'});
      } else {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) {
            res.status(401).json({message: 'Password encryption error'})
          }
          else {
            req.body.password = hash;
            const user = new User(req.body);

            if (req.file) { user.avatar = `/uploads/${req.file.filename}` }
            
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
    }) 
  }
};

module.exports = UsersController;
