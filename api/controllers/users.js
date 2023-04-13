const User = require("../models/user");
const path = require('path');
const fs = require('fs')

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password} = req.body;
    const profilePicture = req.file;

    const user = new User({
      name,
      email,
      password,
      profilePicture: {
        data: fs.readFileSync(path.join(__dirname, '../frontend/public', profilePicture.filename)),
        contentType: profilePicture.mimetype
      }
    })

    try {
      await newUser.save();
      fs.renameSync(path.join(__dirname, '../public/images/', profilePicture.filename), path.join(__dirname, '../public/images/', newFileName));
      res.json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
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
