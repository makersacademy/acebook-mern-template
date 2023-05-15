const User = require("../models/user");

const UsersController = {
  Update: (req, res) => {
    console.log("Request data:", req.body);
    const { email, password, firstName, lastName } = req.body;
    User.findByIdAndUpdate(req.params.id, { email, password, firstName, lastName }, { new: true },
      (err, user) => {
        if (err) {
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(200).json({ message: "OK", user });
        }
      } 
    )
  }
};


module.exports = UsersController; //update