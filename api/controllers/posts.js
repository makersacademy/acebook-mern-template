const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");


const PostsController = {
  Create: (req, res) => {
    const userId = req.user_id;
    const post = new Post({
      ...req.body,
      userId: userId});
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
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
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts,  token: token });
    });
  },


  Create: (req, res) => {
    const userId = req.user_id;
    const post = new Post({
      ...req.body,
      userId: userId});
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Comment: (req, res) => {
    console.log("COMMENTING")
    console.log(req.params.id)
    // find the post using its id (req.params.id)
    const newComment = req.body.comment;
    
    // add the comment to post.comments
    // you *might* need a mongoose method called findOneAndUpdate

    Post.findOneAndUpdate(
      { _id: req.params.id }, // Find the post by its ID
      { $push: { comments: { comment_message: newComment } } }, // Add the new comment to the comments array
      { new: true }, // Return the updated post
      (err, updatedPost) => {
        if (err) {
          console.error('Error adding comment:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          console.log('Comment added successfully');
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'Comment added successfully', token: token, updatedPost });
        }
      }
    );
  },

  Likes: (req, res) => {
    const newLike = req.body.likes;

    Post.findOneAndUpdate(
      { _id: req.params.id }, // Find the post by its ID
      { $inc: { likes: newLike } }, 
      { new: true }, 
      (err, updatedPost) => {
        if (err) {
          console.error('Like not added:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          console.log('Like added successfully');
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'Like added successfully', token: token, updatedPost });
        }
      }
    );
  },


GetLikes: async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const likes = post.likes;
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ likes, token });
    } catch (err) {
        console.error('Error retrieving post likes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = PostsController;