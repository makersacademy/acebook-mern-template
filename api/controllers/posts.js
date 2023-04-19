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
    const id = req.body._id
    Post.findOneAndDelete({id: id}, async(err, result) =>{
      if(err) {
        throw err;
      }
    
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(202).json({ message: 'Post deleted', token: token });

    })
  }

};

module.exports = PostsController;
