const TokenDecoder = require("../models/token_decoder");
const User = require("../models/user");
const Post = require("../models/post");

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

  Delete: async (req, res) => {
    const UserId = TokenDecoder.decode(req.cookies.token).user_id;

    try {
      const deletedUser = await User.findByIdAndDelete(UserId);

      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await Post.deleteMany({ $or: [
        { firstName: deletedUser.firstName, lastName: deletedUser.lastName },
        { "comments.author.id": UserId }
      ]});

      res.status(200).json({ message: "OK", user: deletedUser });
    } catch (err) {
      console.log("UserUpdates error", err);
      res.status(400).json({ message: "Bad request" });
    }
  },
};

module.exports = UserUpdates;


//findByIdAndUpdate() is a standard mongoose function
//By default, findByIdAndUpdate() returns the document as it was before update was applied. 
//If you set { new: true} , findbyIdAndUpdate() will instead give you the object after update was applied.

