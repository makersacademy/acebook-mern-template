const User = require("../models/user");

/**
 * Actions for Users
 * Create: ***
 */
const UsersController = {
  Create: (req, res) => {
    // create new instance of User from request info
    const user = new User(req.body);
    // save this to the database
    user.save((err) => {
      if (err) {
        // error sets resonse status and returns json object
        res.status(400).json({ message: "Bad request" });
      } else {
        // response is successfully created (note 201)
        // only returns a json object
        res.status(201).json({ message: "OK" });
      }
    });
  },

  Index: (req, res) => {
    res.status(401).json({ message: "Bad request" });
  },
};

module.exports = UsersController;
