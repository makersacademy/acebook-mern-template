const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
// const updatedMessage = require("../../frontend/src/")

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
    post.save(async (err) => { // .save mongoose method
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

    
Update: async (req, res) => {
    const newMessage = req.body.newMessage
    const id = req.body._id
    console.log(newMessage, id)
    try{
      await Post.findById({"_id":req.body._id}, (updatedMessage) => {
        updatedMessage.message = newMessage;
        updatedMessage.save();
    })
  }catch(err){
      console.log(err)
  }
    res.status(201).json({ message: 'OK'})
  }

};


// {_id: req.body.id}, { $set: {"likeCount": likes}} 
module.exports = PostsController;
