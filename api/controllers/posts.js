const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const upload = require("../config/multer");
const cloudinary = require("cloudinary").v2;

const PostsController = {
  Index: async (req, res) => {
    try {
      const posts = await Post.find();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  Create: async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  Delete: async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.deleteOne({ _id: postId });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Post deleted successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  AddComment: async (req, res) => {
    try {
      const postId = req.params.id;
      const message = req.body.message;
      const userName = req.body.userName;
      await Post.updateOne(
        { _id: postId },
        {
          $push: {
            comments: {
              userName: userName,
              timeStamp: Date.now(),
              message: message,
            },
          },
        }
      );
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(200)
        .json({ message: "Comment added successfully", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  AddImage: async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create new post with image URL
      const post = new Post({
        text: req.body.text,
        image: result.secure_url,
      });

      // Save post to the database
      const savedPost = await post.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.json({ message: "Image uploaded successfully", token, post: savedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostsController;
