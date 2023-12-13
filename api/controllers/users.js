const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },

  ChangeAvatar: async (req, res) => {
    const filename = req.body.filename;
    const user_email = req.body.user_email;

    // Check if the request contains avatar filename and user id
    if (!filename || !user_email) {
      return res.status(400).json({ message: "Bad request" });
    }

    // Change avatar with new filename
    const result = await User.findOneAndUpdate(
      { email: user_email },
      { $set: { avatar: filename } },
    );

    // Check if the user was found and updated successfully
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a 201 response indicating success
    res.status(201).json({ message: "OK" });
  },
  GetUserEmails: async (req, res) => {
    User.find({}, "email", (err, users) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(users);
      }
    });
  },
  GetUsernames: async (req, res) => {
    const query = req.query.q;
    const regex = new RegExp(query, 'i');

    User.find({ username: regex }, "_id username", (err, users) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json(users);
      }
    });
  },

  // Obtain user data based on user_id passed FROM TOKEN
  DisplayUserData: (req, res) => {
    const user_id = req.user_id

    User.findById(user_id, (err, user) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({user: user, token: token});
    });
  },   

  // Obtain user data based on user_id passed FROM USER_ID IN REQ.BODY
  DisplayUserDataById: (req, res) => {
    const header_user_id = req.body.user_id

    User.findById(header_user_id, (err, user) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({user: user, token: token});
    });
  },    
  
  
  // method to get the username, avatar and email for a given user_id
  FindInfoByUserId: async (req, res) => {
    const info_user_id = req.params.user_id
    const user = await User.findOne({_id: info_user_id});
    if (!user) {
      return res.status(400).json({ message: "no user found" })
    }
    else {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      return res.status(200).json({ user: user, token: token })
    }
  }
  
};

module.exports = UsersController;
