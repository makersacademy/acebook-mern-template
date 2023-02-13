const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'de2y4osyf',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const UsersController = {
  Create: async (req, res) => {
    const seed = Math.round(Math.random() * 100);
    const avatarUrl = `https://avatars.dicebear.com/api/personas/${seed}.svg`;

    try {
      const imageUrl = req.file ? await uploadImage(req.file) : avatarUrl;

      const user = new User({
        email: req.body.email,
        password: req.body.password,
        image: imageUrl,
        display_name: req.body.display_name,
      });

      await user.save();
      res.status(201).json({ message: 'OK' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Bad request' });
    }
  },
};

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'image', format: 'jpg' },
        (error, apiResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(apiResult.url);
          }
        }
      )
      .end(file.buffer);
  });
};

module.exports = UsersController;
