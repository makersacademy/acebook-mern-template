const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");


const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {  // .find mongoose method
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    console.log(req.body)
    post.save(async (err) => { // .save mongoose method
      if (err) {
        throw err;
      }
      console.log('whats this', post)
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token, post: post });
    });
  },
  Delete: async (req, res) => {
    console.log(req.body)
    await Post.deleteOne({_id:req.body._id}).exec(async (err,result)=> {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json(result);
    })
    },

  Update: async (req, res) => {
      const newMessage = req.body.message
      await Post.findOneAndUpdate({_id:req.body._id}, { $set:{ message: newMessage  }}).exec(async (err,result)=> {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json(result);
    })
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
      res.status(201).json(comment);
  })
  },

  FindSearch: (req, res) => {
    console.log(req.query.searchTerm)
    Post.find({message: { "$regex": req.query.searchTerm, "$options": "i" } },async (err, posts) => {  // .find mongoose method
      const searchResults = posts.map( (post) => {if (post.message.includes("good")){
      }})

      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token, results: searchResults});
    });
  },

};

module.exports = PostsController;
