const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      console.log(posts);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  IndexByUserId: (req, res) => {
    const userId = req.user_id;
    Post.find({ userId: userId }, (err, posts) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const userId = req.user_id;
    const post = new Post({
      ...req.body,
      userId: userId
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Comment: async (req, res) => {
    console.log("COMMENTING");
    console.log(req.params.id);
    const newComment = req.body.comment;

    try {
      // Fetch user information based on userId
      const user = await User.findById(req.user_id);
      if (!user) {
        throw new Error("User not found");
      }

      // Add the comment to post.comments with the fetched username
      Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              comment_message: newComment,
              username: user.displayName, // Assuming displayName is the user's username
              userId: req.user_id
            },
          },
        },
        { new: true },
        (err, updatedPost) => {
          if (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            console.log('Comment added successfully');
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            updatedPost.comments.forEach(comment => {
              comment.userId = comment.username;
            });
            console.log(updatedPost);
            res.status(201).json({ message: 'Comment added successfully', token: token, updatedPost });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = PostsController;
