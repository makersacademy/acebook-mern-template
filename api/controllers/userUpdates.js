const TokenDecoder = require("../models/token_decoder");
const User = require("../models/user");

const UserUpdates = {
  Update: (req, res) => {
    const UserId = TokenDecoder.decode(req.cookies.token).user_id;
    console.log("decoded_user_id", UserId);


    console.log("Request data:", req.body);
    const { email, password, firstName, lastName } = req.body;

    const updateFields = {};
    if (email) updateFields.email = email;
    if (password) updateFields.password = password;
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;

    User.findByIdAndUpdate(
       UserId,
      // { email, password, firstName, lastName },
      updateFields,
      { new: true, strict: false },
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

  Delete: (req, res) => {

    const UserId = TokenDecoder.decode(req.cookies.token).user_id;
    console.log("decoded_user_id", UserId);

    //add code to replace deleted user with unknown user in order to keep the comments
    User.findByIdAndDelete(  
      UserId,
      (err, user) => {
        if (err) {
          console.log("UserUpdates error", err);
          res.status(400).json({ message: "Bad request" });
        } else {
          res.status(200).json({ message: "OK", user });
        }
      }
    );
  }
};

module.exports = UserUpdates; 

//findByIdAndUpdate() is a standard mongoose function
//By default, findByIdAndUpdate() returns the document as it was before update was applied. 
//If you set { new: true} , findbyIdAndUpdate() will instead give you the object after update was applied.

