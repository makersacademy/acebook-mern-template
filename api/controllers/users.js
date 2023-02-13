const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'de2y4osyf',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const UsersController = {
  Create: (req, res) => {
    const seed = Math.round(Math.random() * 100);
    const avatarUrl = `https://avatars.dicebear.com/api/personas/${seed}.svg`;
    if (req.file) {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', format: 'jpg' },
          (error, result) => {
            if (error) {
              console.error(error);
              res.status(400).json({ message: 'Internal server error' });
            } else {
              const image = result.url;
              const user = new User({
                email: req.body.email,
                password: req.body.password,
                image,
                display_name: req.body.display_name,
              });

              user.save((err) => {
                if (err) {
                  res.status(400).json({ message: 'Bad request' });
                } else {
                  res.status(201).json({ message: 'OK' });
                }
              });
            }
          }
        )
        .end(req.file.buffer);
    } else {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
        image: avatarUrl,
        display_name: req.body.display_name,
      });

      user.save((err) => {
        if (err) {
          res.status(400).json({ message: 'Bad request' });
        } else {
          res.status(201).json({ message: 'OK' });
        }
      });
    }
  },
};

module.exports = UsersController;
