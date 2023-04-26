const User = require("../models/user");

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
  Update: async (req, res) => {
    await User.findOneAndUpdate({ _id: req.body._id}, { $set:{ firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic  }})
    .exec(async (err, result)=> {
      if (err) {
        throw err;
      }
      
      res.status(201).json({ message: 'OK', _id: req.body._id, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic });
    })
  }
}

module.exports = UsersController;
