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

    const post = await Post.find({ _id: req.body.postId });

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.postId, likes: { $ne: userId } },
      { $push: { likes: userId } },
      { new: true }
    );

    // refresh the token
    const token = await generateToken(req.userId);

    // send 201 status code back with the updated post and a refreshed token
    res.status(201).json({ updatedPost: updatedPost || post[0], token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dislikePost = async (req, res) => {
  try {
    const { userId } = req;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.postId, likes: userId },
      { $pull: { likes: userId } },
      { new: true }
    );

    // refresh the token
    const token = await generateToken(req.userId);

    // send 201 status code back with the updated post and a refreshed token
    res.status(201).json({ updatedPost, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllPosts, createPost, likePost, dislikePost };
