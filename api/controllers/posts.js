const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ posts, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: "OK", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const PostsController = {
//   Index: (req, res) => {
//     Post.find(async (err, posts) => {
//       if (err) {
//         throw err;
//       }
//       const token = await TokenGenerator.jsonwebtoken(req.user_id);
//       res.status(200).json({ posts, token });
//     });
//   },
//   Create: (req, res) => {
//     const post = new Post(req.body);
//     post.save(async (err) => {
//       if (err) {
//         throw err;
//       }

//       const token = await TokenGenerator.jsonwebtoken(req.user_id);
//       res.status(201).json({ message: "OK", token });
//     });
//   },
// };

module.exports = { getAllPosts, createPost };
