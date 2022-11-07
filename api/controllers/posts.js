const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    const populatedPosts = Post.find().populate('user');
    populatedPosts.find().sort('-date').find(async (err, posts) => {
      if (err) {
        throw err;
      }
     
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token, user: req.user_id });
    });
  },
  Create: (req, res) => {
    const postData = {message: req.body.message, user: req.user_id, token: req.body.token};
    //console.log(postData);
    const post = new Post(postData);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ post: post, token: token});
    });
  },
  Likes: (req, res) => {
    let postData = {post: req.body.post, token: req.body.token};
    // console.log(postData)

    var conditions = {
      _id: postData.post._id
    }

    var update = {
      likes: postData.post.likes.push(req.user_id)
    }
    
    Post.findOneAndUpdate(conditions, update)

    res.status(200).json({token: postData.token, post: postData.post, post_id: postData.post._id, likes: postData.post.likes });
  }
};

module.exports = PostsController;
