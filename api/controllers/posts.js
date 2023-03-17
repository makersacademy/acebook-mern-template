const Post = require("../models/post");
const Comment = require("../models/comment");
const generateToken = require("../models/token_generator");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("author");
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

const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate([
        {
          path: "author",
          model: "User",
          select: "name username imageId",
        },
        {
          path: "comments",
          model: "Comment",
          populate: {
            path: "author",
            model: "User",
            select: "name username imageId",
          },
        },
      ])
      .lean();

    const mapComments = post.comments.map((comments) => {
      return {
        id: comments._id,
        message: comments.message,
        createdAt: comments.createdAt,
        authorName: comments.author.name,
        likes: comments.likes,
      };
    });

    const mappedPost = { ...post, comments: mapComments };

    const token = await generateToken(req.userId);
    return res.status(200).json({ mappedPost, token });
  } catch (error) {
    return res.status(500).json({ error });
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
    const { postId } = req.params;

    const postComments = await Comment.find({ postId }).populate({
      path: "author",
      model: "User",
      select: "name username imageId",
    });
    const token = await generateToken(req.userId);

    // If no comments are found, return an error
    if (!postComments) {
      return res
        .status(404)
        .json({ error: "No comments found for this post" }, token);
    }

    const comments = postComments.map((comment) => {
      return {
        commentId: comment.id,
        postId: comment.postId,
        message: comment.message,
        authorName: comment.author.name,
        createdAt: comment.createdAt,
        likes: comment.likes,
        imageId: comment.author.imageId,
      };
    });

    return res.status(200).json({ comments, token });
  } catch (error) {
    return res.status(500).json({ error });
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

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  createComment,
  getPostComments,
  likePost,
  dislikePost,
};
