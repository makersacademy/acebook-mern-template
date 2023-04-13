const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate({
        path: "user",
        select: "name image",
      })
      .populate({
        path: "comments.user",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    let postContent = { ...req.body, user: req.user_id };
    const post = new Post(postContent);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  CreateComment: async (req, res) => {
    const postId = req.params.id;
    const comment = { user: req.user_id, message: req.body.message };
    console.log(comment);
    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      );
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ post, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  Update: async (req, res) => {
    const postId = req.params.id;
    const userId = req.user_id;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const userIndex = post.likedBy.indexOf(userId);
  
      if (userIndex === -1) {
        post.likes += 1;
        post.likedBy.push(userId);
      } else {
        post.likes -= 1;
        post.likedBy.splice(userIndex, 1);
      }
  
      await post.save();
  
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
};

module.exports = PostsController;
