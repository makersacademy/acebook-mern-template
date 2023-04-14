const User = require("../models/user");
const path = require('path');
const fs = require('fs')

const UsersController = {
    Create: async (req, res) => {
      const user = await new User(req.body);
      user.save((err) => {
        if (err) {
          res.status(400).json({message: 'Bad request'})
        } else {
          res.status(201).json({ message: 'OK' });
        }
      });
    },
  UploadImage: (req, res) => {
    const file = req.file;
    if(!file) {
      return res.status(400).json({message: 'no file uploaded'})
    }

    return res.json({filename: file.filename})
  }
};

module.exports = UsersController;

