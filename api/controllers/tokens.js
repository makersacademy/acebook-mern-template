const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require('bcryptjs')

const SessionsController = {

  Create: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email })
    if (!email) {
      res.status(422).json({ message: "Please enter an email." });
    } else if (!password) {
      res.status(422).json({ message: "Please enter a password." });
    } else if (!user) {
      res.status(401).json({ message: "User not found." });
    } else {
      bcrypt.compare(password, user.password)
      .then(match => {
        if (match) {
          const token = TokenGenerator.jsonwebtoken(user.id)
          const {_id, email, username, firstName, lastName, profilePic} = user
          res.status(201).json({ token: token, message: "Sign in successful!", user: {_id, email, username, firstName, lastName, profilePic} });  
        } else {
          res.status(401).json({ message: "Email or password is invalid." });
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}

module.exports = SessionsController;
