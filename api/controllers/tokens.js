const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const SessionsController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        // if the user doesn't exist in the db
        console.log("auth error: user not found")
        res.status(401).json({ message: "auth error" });
      } else if (user.password !== password) {
        // if the passwords don't match
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "auth error" });
      } else {
        // successful login, generate a new token and assign it to that user_id
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
