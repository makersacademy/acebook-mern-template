const User = require('../models/user');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'de2y4osyf',
  api_key: '285215674626885',
  api_secret: 'BkVMUzdVZfQq-XDSQzkrIDoM0Ac',
});

const UsersController = {
  Create: (req, res) => {
    if (req.file) {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'raw', format: 'jpg' },
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
