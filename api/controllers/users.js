const bcrypt = require('bcrypt')
const User = require("../models/user");
const TokenGenerator = require('../models/token_generator');

const UsersController = {
  Index: (req, res) => {
    User.findById(req.user_id, (err, data) => {
      if (err) {
        res.status(400).json({message: 'Unable to find user'})
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({user: data, token: token});
      }
    })
  },

  Create: (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        res.status(409).json({message: 'Email address already exists'});
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
  },
  
  Delete: (req, res) => {
    User.deleteOne({_id: req.query.id}, (err, data) => {
      if (err) {
        res.status(400).json({message: 'Unable to delete user'})
      } else {
        res.status(200).json({message: 'User deleted'});
      }
    })
  }

  
};

module.exports = UsersController;
