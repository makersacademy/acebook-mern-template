const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      // map posts objects list so it displays from the newest by it's date
      // we're passing sorting function which calculates differences between two post objects
      posts.sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const user_id = req.user_id;
    const post = new Post({
      ...req.body,
      // added a line to add/update user_id field
      user_id: user_id,
      });
    post.save((err, post) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, _id: post._id });
    });
  },

  // method to get posts filtered by user_id
  FindPostsByUserId: async (req, res) => {
    const user_id = req.params.user_id;

    // finding posts with specific user_id
    const result = await Post.find({ user_id: user_id });
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    console.log("HERE ARE THE POSTS:", result)

    if (!result) {
      return res.status(400).json({ message: "No posts found" });
    } else {
      // post sorted from the newest
      result.sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).json({ posts: result, token: token });
    }
  },

  //method to like a post
  likePost: async (req, res) => {
    console.log("Controller - postId:", req.params._id);
    const postId = req.params._id;
    const user_id = req.user_id;   
    console.log("user_id:" , user_id)
    console.log("postId:", postId);

    try {
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the user has already liked the post
      if (post.likes.includes(user_id)) {
        return res.status(400).json({ message: "You have already liked this post" });
      }

      // Add user_id to the likes array
      post.likes.push(user_id);

      // Save the updated post
      await post.save();

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Post liked", token: token, likes: post.likes.length });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  };

module.exports = PostsController;
