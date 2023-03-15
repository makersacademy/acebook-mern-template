const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const bcrypt = require('bcryptjs')

const SessionsController = {
  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = await TokenGenerator.jsonwebtoken(user.id);
          res.status(201).json({ token: token, message: "OK" });
        } else {
          console.log("auth error: passwords do not match");
          res.status(401).json({ message: "auth error password" });
        }
      }
    });
  },
}    

module.exports = SessionsController;
