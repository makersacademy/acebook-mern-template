const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
  Get: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: 'OK', token: token, user: user });
  },
}

module.exports = UsersController;