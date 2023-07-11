const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const bcrypt = require("bcrypt");

const SessionsController = {
  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error user not found" });
        return;
      }
    
      bcrypt.compare(password, user.password, async (error, isMatch) => {
        if (error) {
          console.error("Error comparing passwords:", error);
          res.status(500).json({ message: "Internal server error" });
          return;
        }
    
        if (!isMatch) {
          console.log("Password doesn't match!");
          res.status(401).json({ message: "auth error password mismatch" });
          return;
        }
    
        const token = await TokenGenerator.jsonwebtoken(user.id);
        res.status(201).json({ token: token, message: "OK" });
      });
    }).catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
  },
};

module.exports = SessionsController;
