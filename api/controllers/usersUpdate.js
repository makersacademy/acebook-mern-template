const User = require("../models/user");

const UserUpdates = {
  Update: (req, res) => {
    console.log("Request data:", req.body);
    const { email, password, firstName, lastName } = req.body;
    User.findByIdAndUpdate(
      req.params.id,
      { email, password, firstName, lastName },
      { new: true },
      (err, user) => {
        if (err) {
          console.log("UserUpdates error", err);
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(200).json({ message: "OK", user });
        }
      }
    );
  },
};

module.exports = UserUpdates; 

//findByIdAndUpdate() is a standard mongoose function
//By default, findByIdAndUpdate() returns the document as it was before update was applied. 
//If you set { new: true} , findbyIdAndUpdate() will instead give you the object after update was applied.
