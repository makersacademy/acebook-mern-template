const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const defaultImagePath = path.join(
  __dirname,
  "../public/images/default.svg.png"
);

const defaultImage = {
  data: fs.readFileSync(defaultImagePath),
  contentType: "image/png", // Adjust the content type based on your default image format
};

const UsersController = {
  Create: (req, res) => {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      image: defaultImage,
    });
    user.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      const user = new User({
        email: email,
        password: hashedPassword, // Store the hashed password
        username: username,
        image: defaultImage,
      });

      user.save((err) => {
        if (err) {
          return res.status(400).json({ message: "Bad request" });
        } else {
          return res.status(201).json({ message: "OK" });
        }
      });
    });
  },
};

module.exports = UsersController;
