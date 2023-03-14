const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");


  const PostsController = {
    Index: async (req, res) => {
      try {
        const posts = await Post.find().populate('poster', 'firstName').sort({createdAt: -1});;
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
        console.log(res.status);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to retrieve posts' });
      }
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

    NewLike: (req, res) => {
      Post.findById(req.body.postId, (err, post) => {
        const alreadyLiked = post.likes.includes(req.body.userId);
        if(alreadyLiked){
          res.status(401).json({ message: "post already liked"})
        }
        if (err) {
          throw err;
        } else {
          post.likes.push(req.body.userId);
          post.save((err) => {
            if (err) {
              throw err;
            } else {
              res.status(201).json({ message: 'Like added' });
            }
          });
        }
      });
    },

    Unlike: (req, res) => {
      Post.findById(req.body.postId, (err, post) => {
        if (err) {
          throw err;
        } else {
          const alreadyLiked = post.likes.includes(req.body.userId);
          if (alreadyLiked) {
            const index = post.likes.indexOf(req.body.userId);
            post.likes.splice(index, 1);
            post.save((err) => {
              if (err) {
                throw err;
              } else {
                res.status(201).json({ message: 'Unlike successful' });
              }
            })
          } else {
            res.status(404).json({ message: "post already unliked"})
          }
        }}
      )}
};

module.exports = PostsController;
