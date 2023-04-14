const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const SessionsController = {
  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else if (user.password !== password) {
        console.log("auth error: invalid password");
        res.status(401).json({ error: "Invalid password" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id);
        res.status(201).json({ token: token, user_id: user.id, message: "OK" });
      }
    });
  },
};

module.exports = SessionsController;