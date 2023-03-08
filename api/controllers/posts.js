const Post = require("../models/post");
const generateToken = require("../models/token_generator");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    const token = await generateToken(req.userId);
    res.status(200).json({ posts, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPost = async (req, res) => {
  try {
    await Post.create(req.body);
    const token = await generateToken(req.userId);
    res.status(201).json({ message: "OK", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { getAllPosts, createPost };
