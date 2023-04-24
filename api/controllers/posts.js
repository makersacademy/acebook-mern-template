const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Delete: (req, res) => {
    Post.deleteOne({"_id": req.body.id }, async (err) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'OK', token: token });
    });
      
  },

  LikePost: (req, res) => {
    Post.findByIdAndUpdate(req.body._id, {
      $push: { likes: req.user_id }
    },{
      new:true
    }).exec(async (err,result)=> {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json(result);
  })
  },

  UnlikePost: (req, res) => {
    Post.findByIdAndUpdate(req.body._id, {
      $pull:{ likes: req.user_id }
    },{
      new:true
    }).exec(async (err,result) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json(result);
  })
  },

  CommentPost: (req, res) => {
      const comment = {
        text: req.body.text,
        postedBy: req.user_id
      }
    Post.findByIdAndUpdate(req.body._id, {
      $push:{ comments: comment }
    },{
      new:true
    }).populate("comments.postedBy", "_id")
    .exec(async (err,result) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json(result);
  })
  },
  // Update: (req, res) => {
  //   Post.updateOne(
  //     {_id: req.body.id}, { $set: {"likeCount": likes}} 
  //     });
  //   )
  // }
};

module.exports = PostsController;
