// const Like = require("../models/like");

// const LikesController = {

// Create: (req, res) => {
//   const post = req.post_id
//   const like = new Like(post: post);
//   like.count.push(req.user_id)
//   like.save(async (err) => {
//     if (err) {
//       throw err;
//     }

//     const token = await TokenGenerator.jsonwebtoken(req.user_id)
//     res.status(201).json({ like: like, token: token});
//   });
// },
// };

// module.exports = LikesController;