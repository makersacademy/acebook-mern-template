const Post = require("../models/post");
const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UsersController = require("../controllers/users")



const PostsController = {

  Index: async(req, res) => {
    const posts = await Post.find().populate(['user','comments']).exec();
    if (!posts){
      res.status(500);
    }
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ posts: posts, token: token });

  },
  Update: (req, res) => {
    const postId = req.params.id;
  

    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (!post) {
        return res.status(404).json({ message: "post not found!" });
      }
     
      const updatedMessage = req.body.message;
      const userID = post.user;
      
      if (userID == req.user_id) {
        post.message = updatedMessage;
        
      } else {
        return res.status(401).json({ message: "auth error" });
      }

      post.save((err) => {
        if (err) {
          res.status(500).json({ message: "error" });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res
          .status(200)
          .json({ message: "Post updated successfully", token: token });
      });
    });
  },
  Create: async(req, res) => {
    userid = req.user_id;
    const post = new Post({
      message: req.body.message,
      user: req.user_id,
    });
    post.save(async(err) => {
      if (err) {
        throw err;
      }
      const user = await User.findById(userid)
      console.log("Post", post);
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      const postId = post.id;
      res.status(201).json({ message: "OK", postId:postId, user: user, token: token,post: post });
    });
  },

  Like: async (req, res) => {
    const postId = req.params.id;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Already Likes" });
    }
    else {
      post.likes.push(userId);
    }
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      const likes = post.likes ;
      const token = await TokenGenerator.jsonwebtoken(userId)
      res.status(201).json({ likes:likes ,message: 'OK', token: token });
    })
  },

  Delete: async (req, res) => {
    try {
      // Added validation if the request hasn't got the "Authorization" header
      // you are not able to make a post
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized. Missing token.' });
      }
      // checking if post exists
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found.' });
      }
      // To compare id's of users, we need to get access to the id of
      // of the user who's logged in. This parameter is unavailable 
      // in the req so we need to extract it from Authorization token.
      const token = req.headers.authorization.split(' ')[1];
      // Verify the token to get the payload, including the user_id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // user_id - who wants to delete post
      const user_id = decodedToken.user_id;
      if (post.user.toString() !== user_id &&
        (await Post.exists({ _id: Comment.post, user: user_id })) === false
      ) {
        return res
          .status(403)
          .json({ error: 'Forbidden. You Are not allowed to delete this post.' });
      }
      // Delete the associated comments
      await Comment.deleteMany({ post: post._id });
      //delete the post
      await post.deleteOne();
      //return success response
      const newToken = TokenGenerator.jsonwebtoken(user_id);
      res
        .status(200)
        .json({ message: 'Post deleted succesfully.', token: newToken });
    }
    catch (err) {
      return res.status(500).json({ error: 'Unexpected error occured.' });
    }
  },
};

module.exports = PostsController;
