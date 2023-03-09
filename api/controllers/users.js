const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    // await User.create(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "OK" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

module.exports = { createUser };

//
// const UsersController = {
//   Create: (req, res) => {
//     const user = new User(req.body);
//     user.save((err) => {
//       if (err) {
//         res.status(400).json({ message: "Bad request" });
//       } else {
//         res.status(201).json({ message: "OK" });
//       }
//     });
//   },
// };
//
//
//
// module.exports = UsersController;
