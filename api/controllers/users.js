const User = require('../models/user');
const uploadImage = require('./uploadImage');
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
      res.status(400).json({ message: 'Bad request' });
    }
  },
};

module.exports = UsersController;
