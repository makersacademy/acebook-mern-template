const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const ProfileController = {
  GetProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const { name, username, bio, followers, image } = user;
        const token = await TokenGenerator.jsonwebtoken(req.params.id);

        res.status(200).json({
          name,
          username,
          bio,
          followers,
          image,
          token,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  UpdateProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const { name, bio } = req.body;
        user.name = name || user.name;
        user.bio = bio || user.bio;

        await user.save();
        const token = await TokenGenerator.jsonwebtoken(req.params.id);

        res.status(200).json({
          message: "Profile updated successfully.",
          token,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  UpdateProfileImage: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        if (req.file) {
          user.image.data = req.file.buffer; // Access the buffer from the multer middleware
          user.image.contentType = req.file.mimetype;

          await user.save();
          const token = await TokenGenerator.jsonwebtoken(req.params.id);

          res.status(200).json({
            message: "Profile image updated successfully.",
            token,
          });
        } else {
          res.status(400).json({ message: "No image file received" });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },

  GetProfileImage: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || !user.image.data) {
        res.status(404).json({ message: "Image not found" });
      } else {
        const image = Buffer.from(user.image.data, "base64");
        res.writeHead(200, {
          "Content-Type": user.image.contentType,
          "Content-Length": image.length,
        });
        res.end(image);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },
};

module.exports = ProfileController;
