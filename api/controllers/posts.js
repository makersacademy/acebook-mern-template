const Post = require("../models/post");
const Comment = require("../models/comment");
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

const createComment = async (req, res) => {
  try {
    const { userId, postId } = req;

    const comment = new Comment(req.body);
    comment.author = userId;
    await comment.save();

    const post = await Post.find({ _id: postId });
    const token = await generateToken(req.userId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" }, token);
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { comments: comment.id } },
      { new: true }
    );

    return res.status(201).json({ updatedPost: updatedPost || post[0], token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    // PostId is passed as a query parameter
    const { postId } = req.query;

    const comments = await Comment.find({ postId }).populate(
      "author",
      "username"
    );
    const token = await generateToken(req.userId);

    // If no comments are found, return an error
    if (!comments) {
      return res
        .status(404)
        .json({ error: "No comments found for this post" }, token);
    }

    // Map the comments to a new array with only the fields we want to return
    const postComments = comments.map((comment) => {
      return {
        id: comment.id,
        message: comment.message,
        authorName: comment.author.username,
        createdAt: comment.createdAt,
        likes: comment.likes,
      };
    });
    return res.status(200).json({ postComments, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  createComment,
  getPostComments,
  likePost,
  dislikePost,
};
