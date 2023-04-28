const User = require("../models/user");
const bcrypt = require('bcryptjs')

const UsersController = {

  Create: async (req, res) => {

    let checkEmail = null
    let checkUsername = null
    
    await User.findOne({email: req.body.email}).then((foundUser) => checkEmail = foundUser)
    await User.findOne({username: req.body.username}).then((foundUser) => checkUsername = foundUser)

    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(401).json({ message: "Please fill all fields."})
    } else if (checkEmail) {
      res.status(401).json({ message: "Email is already in use."})
    } else if (checkUsername) {
      res.status(401).json({ message: "Your chosen username is already in use." })
    } else {
        bcrypt.hash(req.body.password, 11)
        .then(hashPassword => {
          const newUser = {
            email: req.body.email,
            password: hashPassword,
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }
          const user = new User(newUser);
          user.save((err) => {
            if (err) {
              res.status(400).json({ message: 'Bad request, please try again.' })
            } else {
              res.status(201).json({ message: 'Account created!' });
            }
          });
        })
    }
  },

  Update: async (req, res) => {

    let checkUser = null
    await User.findOne({username: req.body.username}).then((foundUser) => checkUser = foundUser)

    if (!req.body.firstName || !req.body.lastName || !req.body.username) {
      res.status(401).json({ message: "Please fill all fields."})
    } else if (checkUser && checkUser._id != req.body._id) {
      res.status(401).json({ message: "Your chosen username is already in use." })
    } else {
      console.log("got to 44")
      await User.findOneAndUpdate({_id: req.body._id}, { $set:{ firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic  }})
      res.status(201).json({ message: 'Account updated!', _id: req.body._id, email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, profilePic: req.body.profilePic });
    }
  }
}



module.exports = UsersController;
