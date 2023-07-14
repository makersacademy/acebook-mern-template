const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      photo: req.file ? req.file.filename : undefined,
    });
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },
  Profile: (req, res) => {
    let userID;
    if (req.params.id === "me") {
      userID = req.user_id;
    } else {
      userID = req.params.id;
    }

    User.findById(userID).exec(async (err, user) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user: user, token: token });
    });
  },
};

module.exports = UsersController;
