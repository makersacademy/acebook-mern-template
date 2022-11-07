const Post = require("../models/post");
const User = require("../models/user");
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
    User.findById(req.user_id).then(async (user) => {
      console.log(user)
      console.log(user.id)
      console.log(user.username)
    
      const newPost = {
        message: req.body.message,
        author: user
      };
      console.log(newPost.author.username)
     
      const post = new Post(newPost);
    
      //user.posts.push(newPost);
    
      post.save(async (err) => {
        if (err) {
          throw err;
        }
    
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'OK', token: token });
      });
    
    })
  },


};

module.exports = PostsController;


// user.posts.push(newPost);
// // we save our user with our new data (our new post).
// user.save((err) => {
//    return res.redirect(`/posts/${post.id}`);




// User.findById(req.user_id, (err, user) => {
//   console.log(user)
//   const newPost = {
//     message: req.body.message,
//     author: user
//   };

//   const post = new Post(newPost);

//   post.save(async (err) => {
//     if (err) {
//       throw err;
//     }

//     const token = await TokenGenerator.jsonwebtoken(req.user_id)
//     res.status(201).json({ message: 'OK', token: token });
//   });
// })