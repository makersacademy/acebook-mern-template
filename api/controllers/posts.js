const Post = require("../models/post");

const TokenGenerator = require("../models/token_generator");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('author', 'userName photo').exec((async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // This is mapping an additional field called didUserLikeThis inside posts
      // which returns true if the user's id is already in the likedBy array.
      // likedBy array is the list of users who already liked the post
      posts.forEach(post => {
        if (post.likedBy.includes(req.user_id)) {post._doc.didUserLikeThis = true;}
        if (post.author._id.toString() === req.user_id) {post._doc.didUserPostThis = true;}
      })
      res.status(200).json({ posts: posts, token: token });
    }));
  },
  Delete: (req, res) => {
    Post.findOneAndDelete({ _id: req.body.post_id }, async (err, deletedPost) => {
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      if (err) {
        res.status(400).json({message: "Unable to delete post", token: token})
      } else if (deletedPost) {
        res.status(200).json({message: "Document deleted successfully.", token: token})
      } else {
        res.status(404).json({message: "Document not found.", token: token})
      }
    })
  },
  Create: (req, res) => {
    const post = new Post();
    post.message = req.body.message
    // add the user ID of the author who wrote the post
    post.author = req.user_id
    post.createdDateTime = new Date()
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  AddLike: (req, res) => {
    Post.findById(req.body.post_id, async (err, post) => {
      if (err) {
        throw err;
      } else {
        post.likes += 1
        post.likedBy.push(req.user_id)
        post.save()
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ likes: (post.likes), token: token });
      }
    })
  },
  Unlike: (req, res) => {
    Post.findById(req.body.post_id, async (err, post) => {
      if (err) {
        throw err;
      } else {
        post.likes -= 1
        const index = post.likedBy.indexOf(req.user_id);
          if (index > -1) {post.likedBy.splice(index, 1);}
        post.save()
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ likes: (post.likes), token: token });
      }
    })
  },
  CreateComment: async (req, res) => {
    console.log("here")
    const comment = new Comment(req.body);
    comment.author = req.params.userId;
    comment.message = req.body.value;
    const postId = req.params.postId;
    console.log(postId)
    const post = await Post.findById(postId);

    post.comments.push(comment);
    await post.save();

    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: 'Comment Added', token: token });
  },
};

module.exports = PostsController;
