const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require('bcrypt');


const SessionsController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "auth error, user does not exist" });
      } else if (await bcrypt.compare(password, user.password) === false) {
        res.status(401).json({ message: "auth error, password incorrect" });
      } else {
        const token = TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};


module.exports = SessionsController;
