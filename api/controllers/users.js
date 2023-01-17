const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

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
  Get: async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: 'OK', token: token })
  } 
};

// Index: (req, res) => {
//   Post.find({})
//     .populate({ path: 'user_id', select: 'name avatar' })
//     .exec(async (err, posts) => {
//       if (err) {
//         throw err;
//       }
//       const token = await TokenGenerator.jsonwebtoken(req.user_id);
//       res.status(200).json({ posts: posts, token: token });
//     });
// },

module.exports = UsersController;

// token: token
// name: user.name, bio: user.bio, age: user.age, avatar: user.avatar, hometown: user.hometown, profession: user.profession, relationship_status: user.relationship_status, friends: user.friends