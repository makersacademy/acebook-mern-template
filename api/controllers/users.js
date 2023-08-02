const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' , id: user.id});
      }
    });
  },
  FindWithId: (req, res) => {
    const id = req.params.id;
    //extract the user id from the response body
    user_id = req.body.user_id;
    console.log(user_id)
    User.findById(id, (err, user) => {

      if (err) {
        res.status(400).json({message: 'Bad request'})
      }
      if (!user) {
        res.status(401).json({message: 'User not found'})
      }
      if (user_id === req.user_id) {
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({id: user.id, email: user.email, username: user.username, token: token})

      }
    });
  },
};
  


module.exports = UsersController;
