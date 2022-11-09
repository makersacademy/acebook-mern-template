const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const SessionsController = {

  // Index: (req, res) => {
  //   console.log(req.user_id);
  //   // const populatedPosts = Post.find().populate('user');
  //   // populatedPosts.find().sort('-date').find(async (err, posts) => {
  //   //   if (err) {
  //   //     throw err;
  //   //   }
     
  //     // const token = await TokenGenerator.jsonwebtoken(req.user_id)
  //     // res.status(200).json({ posts: posts, token: token, user: req.user_id });
  // },

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        console.log("auth error: user not found")
        res.status(401).json({ message: "auth error" });
      } else if  (!user.comparePassword(password)) {
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "auth error" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
