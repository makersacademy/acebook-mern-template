const Post = require("../models/post");
const generateToken = require("../models/token_generator");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    const token = await generateToken(req.userId);
    res.status(200).json({ posts, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.userId;
    await post.save();
    const token = await generateToken(req.userId);
    res.status(201).json({ message: "OK", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const likePost = async (req, res) => {
  try {
    // check userId to know who likes it
    const { userId } = req;

    // alter the database record
    await Post.updateOne(
      { _id: req.body.postId },
      { $push: { likes: userId } }
    );

    // finds the latest record
    const updatedPost = await Post.find({ _id: req.body.postId });

    // refresh the token
    const token = await generateToken(req.userId);

    // send 201 status code back with the updated post and a refreshed token
    res.status(201).json({ updatedPost: updatedPost[0], token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getAllPosts, createPost, likePost };
