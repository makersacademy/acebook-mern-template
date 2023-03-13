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

const createComment = async (req, res) => {
  try {
    const { userId, postId } = req;

    const comment = new Comment(req.body);
    comment.author = userId;
    await comment.save();

    const post = await Post.find({ _id: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { comments: comment.id } },
      { new: true }
    );

    const token = await generateToken(req.userId);

    return res.status(201).json({ updatedPost: updatedPost || post[0], token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.query;

    const comments = await Comment.find({ postId }).populate(
      "author",
      "username"
    );

    if (!comments) {
      return res.status(404).json({ error: "No comments found for this post" });
    }

    // return res.status(200).json({ comments });
    const postComments = comments.map((comment) => {
      return {
        id: comment.id,
        message: comment.message,
        author: comment.author.username,
        createdAt: comment.createdAt,
      };
    });
    return res.status(200).json({ postComments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { getAllPosts, createPost, createComment, getPostComments };
