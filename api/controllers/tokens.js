const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require("bcrypt");

const SessionsController = {
  Create: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = await TokenGenerator.jsonwebtoken(user.id)
      res.status(201).json({ token: token, user_id: user.id, message: 'OK'})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({message: error.message})
    }
  }
};

module.exports = SessionsController;
