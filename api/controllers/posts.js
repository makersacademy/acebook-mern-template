const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");
const { ObjectID } = require("mongodb");


const PostsController = {
  Index: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('author', 'email')
        .populate({
          path:'comments',
          populate: {path: 'author'}
        })
        .sort({ created: -1 });

      
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      const userID = req.user_id
      res.status(200).json({ posts: posts, token: token, userID: userID});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  Create: (req, res) => {

    const post = new Post(req.body);
    post.author = req.user_id
    console.log(post)
    post.save((err) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Update: async (req, res) => {

    const postId = req.params.id
    const posts = Post.find()
    const newLikes = req.body.likes
    try {
      posts.updateOne({ _id: ObjectID(postId) }, { $set: { likes: newLikes } });
      res.status(201).json({ message: 'Successfully updated' });
      
    } catch (err) {
      throw err;
    }
  }
} 



module.exports = PostsController;
