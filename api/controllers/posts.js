const { updateOne, updateMany } = require("../models/post");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    const populatedPosts = Post.find().populate('user');
    populatedPosts.find().sort('-date').find(async (err, posts) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ posts: posts, token: token, user: req.user_id });
      }
     
      
    });
  },

  Create: (req, res) => {

    console.log(req);
    const postData = {
      message: req.body.message, 
      user: req.user_id, 
      token: req.body.token, 
      img: req.body.img};
    console.log(postData);
    if (req.body.message === "") {
      res.status(400).json({ message: "Field cannot be empty"});

    } else {
      const post = new Post(postData);
      post.save(async (err) => {
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ post: post, token: token});
    });

    }
    
  },

  Likes: (req, res) => {
    let postData = {post: req.body.post, token: req.body.token, status: req.body.status};
    
    if (req.body.status === "notLiked") {
    postData.post.likes.push(req.user_id)

      Post.findByIdAndUpdate(postData.post._id,
        { "$push": { "likes": req.user_id } },
        { "new": true, "upsert": true },
        function (err) {
            if (err) throw err;
            console.log('error');
          }
        );
        
    } else {
      Post.findByIdAndUpdate(postData.post._id,
        { "$pull": { "likes": req.user_id } },
        { safe: true, upsert: true },
        function (err) {
            if (err) throw err;
            console.log('error');
          }
        );
    }

  res.status(200).json({token: postData.token, post: postData.post, post_id: postData.post._id, likes: postData.post.likes });
  }
};

module.exports = PostsController;
