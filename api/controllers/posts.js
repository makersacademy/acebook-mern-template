const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  // return all posts
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  // create new post
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};


/*const PostsController = {
  Index: async (req, res) => {
    res.render("posts/index");
  },
  ViewPosts: async (req, res) => {
    const posts = await Post.find]((err, posts) => {
      if (err) {
        throw err;
      }
    }).populate("comments");
    const comments = await Comment.find({});
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ 
      posts: posts.reverse(),
      comments: comments }));
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
CreateReact: (req, res) => {
    req.body = {
      createdAt: req.body.createdAt,
      message: req.body.value,
      firstname: req.session.user.firstname,
      likes: 0,
      comments: [],
    };
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
}
*/
module.exports = PostsController;
