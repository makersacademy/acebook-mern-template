const User = require("../models/user");
const generateToken = require("../models/token_generator");

const SessionsController = {
  Create: (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    User.findOne({ email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else if (user.password !== password) {
        console.log("auth error: passwords do not match");
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await generateToken(user.id);
        res.status(201).json({ token, message: "OK" });
      }
    });
  },
};

module.exports = SessionsController;
