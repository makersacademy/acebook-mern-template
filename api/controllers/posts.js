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
        select: "name image",
      })
      .sort({ createdAt: -1 })
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.locals.user_id = req.user_id;
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    let postContent = { ...req.body, user: req.user_id };
    if (req.file) {
      postContent.photo = req.file.path;
    }
    const post = new Post(postContent);
    post.save(async (err) => {
      if (err) {
        console.log(err);
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
      ).populate({
        path: "user",
        select: "name image",
      }).populate({
        path: "comments.user",
        select: "name image",
      });
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
        return res.status(404).json({ error: "Post not found" });
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
  
      await post.populate({ path: "user", select: "name image" }).execPopulate();
  
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },  
  UpdateComment: async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const userId = req.user_id;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const comment = post.comments.id(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      const userIndex = comment.likedBy.indexOf(userId);
  
      if (userIndex === -1) {
        comment.likes += 1;
        comment.likedBy.push(userId);
      } else {
        comment.likes -= 1;
        comment.likedBy.splice(userIndex, 1);
      }
  
      await post.save();
  
      await post.populate({ path: "user", select: "name image" }).execPopulate();
      await post.populate({
        path: "comments.user",
        select: "name image",
      }).execPopulate();
  
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
   
};

module.exports = PostsController;
