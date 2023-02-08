const User = require('../models/user');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = require('../routes/middleware');

const UsersController = {
  Create: (req, res) => {
    return new Promise((resolve, reject) => {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      if (req.file) {
        user.image = req.file.buffer;
      }

      user.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Bad request' });
        } else {
          res.status(201).json({ message: 'OK' });
          resolve(user);
        }
      });
    });
  },
};

module.exports = UsersController;
