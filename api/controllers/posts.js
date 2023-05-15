const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // This is mapping an additional field called didUserLikeThis inside posts
      // which returns true if the user's id is already in the likedBy array.
      // likedBy array is the list of users who already liked the post
      posts.forEach(post => {
        if (post.likedBy.includes(req.user_id)) {post._doc.didUserLikeThis = true;}})
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
};

module.exports = PostsController;
