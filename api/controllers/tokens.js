const bcrypt = require('bcrypt')
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const SessionsController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        res.status(401).json({ message: "auth error" });
      } else {
          bcrypt.compare(password, user.password, async (err, result) => {
          if (err) {
            res.status(401).json({message: 'Password encryption error'})
          }
          else if (result === false) {
            res.status(402).json({message: 'Incorrect password'})
          }
          else {
            const token = await TokenGenerator.jsonwebtoken(user.id)
            res.status(201).json({ token: token, message: "OK" });
          }
        })
      }
    });
  }
};

module.exports = SessionsController;

//else if (user.password !== password) {
 // res.status(402).json({ message: "auth error" });