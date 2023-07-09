const User = require("../models/user");

const ProfileController = {
  GetProfile: (req, res) => {
    const userId = req.user_id;

    User.findById(userId, (err, user) => {
      if (err) {
        res.status(500).json({ error: err.toString() });
      } else if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const { name, username, bio, followers, image } = user;

        res.status(200).json({
          name,
          username,
          bio,
          followers,
          image,
        });
      }
    });
  },
};

module.exports = ProfileController;
