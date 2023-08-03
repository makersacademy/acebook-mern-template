const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const jwt = require('jsonwebtoken');

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
  // Extract the id for the user who is making the request 
  //from the token
  try {
    const token = req.headers["authorization"].split(' ')[1]
    const decodedToken = jwt.verify(token, "secretsesh")
    const signedInUserId = decodedToken.user_id;

    const urlId = req.params.id
    
    if (signedInUserId !== urlId) {
      res.status(401).json({ message: 'Unauthorized' });
  };
  
  User.findById(urlId, (err, user) => {
    if (err) {
      return res.status(400).json({message: 'Bad request'})
    }
    if (!user) {
      return res.status(401).json({message: 'User not found'})
    } else {
    const token = TokenGenerator.jsonwebtoken(req.user_id)
    res.status(200).json({id: user.id, 
                          email: user.email, 
                          username: user.username, 
                          token: token})
      }
  });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
};

  


module.exports = UsersController;
