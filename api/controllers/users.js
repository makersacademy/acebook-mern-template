const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const defaultImagePath = path.join(
  __dirname,
  "../public/images/default.svg.png"
);

const defaultImage = {
  data: fs.readFileSync(defaultImagePath),
  contentType: "image/png", // Adjust the content type based on your default image format
};

const saltRounds = 10; // Number of salt rounds for bcrypt hashing
const JWT = require("jsonwebtoken");

const UsersController = {
  Create: (req, res) => {
    const { email, password, username } = req.body;

    // Generate a hash for the password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
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

  getUserByUsername: (req, res) => {
    const token = req.params.token; // Assuming the route parameter is named "token"

    // Verify the token to retrieve the user ID
    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        console.log(err);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        const userId = payload.user_id;

        // Find the user by the retrieved user ID
        User.findById(userId, (err, user) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
          } else if (!user) {
            res.status(404).json({ message: "User not found" });
          } else {
            res.status(200).json({ username: user.username });
          }
        });
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
