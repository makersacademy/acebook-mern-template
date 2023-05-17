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

//   Delete: async (req, res) => {
//     const UserId = TokenDecoder.decode(req.cookies.token).user_id;
//     console.log("decoded_user_id", UserId);

//     // Add code to replace deleted user with unknown user in order to keep the comments
//     try {
//       const deletedUser = await User.findByIdAndDelete(UserId);

//       if (!deletedUser) {
//         res.status(404).json({ message: "User not found" });
//         return;
//       }

//       // Remove the comments of the deleted user
//       await Post.updateMany(
//         { "comments.author.id": UserId },
//         {
//           $set: {
//             "comments.$[elem].author.firstName": "Unknown",
//             "comments.$[elem].author.lastName": "User",
//           }
//         },
//         { arrayFilters: [{ "elem.author.id": UserId }] }
//       );

//       res.status(200).json({ message: "OK", user: deletedUser });
//     } catch (err) {
//       console.log("UserUpdates error", err);
//       res.status(400).json({ message: "Bad request" });
//     }
//   },
// };

Delete: async (req, res) => {
  const UserId = TokenDecoder.decode(req.cookies.token).user_id;

  try {
    const deletedUser = await User.findByIdAndDelete(UserId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Remove the comments of the deleted user
    await Post.updateMany(
      { "comments.author.id": UserId },
      {
        $set: {
          "comments.$[elem].author.firstName": "Unknown",
          "comments.$[elem].author.lastName": "User",
          "comments.$[elem].author.name": "Unknown User", // Add this line
        },
      },
      { arrayFilters: [{ "elem.author.id": UserId }] }
    );

    const updatedPost = await Post.findOne({ "comments.author.id": UserId });

    res.status(200).json({ message: "OK", user: deletedUser, post: updatedPost });
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

