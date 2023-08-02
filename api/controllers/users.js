const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

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
  // implement GetUser method (by looking at posts controller as a guide)
  GetUser: (req, res) => {
    
    // access the request parameters and get the id (the named parameter from the route :id) and assign it to userId
    const userId = req.params.id // https://expressjs.com/en/guide/routing.html#:~:text=)%0A%7D)-,Route,-parameters
    
    // call findById mongoose method (https://masteringjs.io/tutorials/mongoose/find-by-id)with userId and callback func on User model 
    // finds user with matching id in database
    User.findById(userId, (err, user) => {
      if (err) {
        throw err;
      }
      // generate new token
      const token = TokenGenerator.jsonwebtoken(req.userId)

      // response contains status, user object with username and email properties, and token
      res.status(200).json({user: {username: user.username}, token: token });
    });
  },
};

module.exports = UsersController;
