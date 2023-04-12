const Post = require("../models/post");
const Users = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");

const PostsController = {
  
  Index: async (req, res) => {
    const user = await findUser(req.user_id)  // method further down

    Post.find(async (err, posts) => {
      if (err) { throw err }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, user: user, token: token });
    }).sort({ createdAt: -1 });
  },
  
  Create: async (req, res) => {
    const post = await buildPostData(req) // method further down

    post.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  GetPostOwnerData: (req, res) => {
    Users.findById(req.params.ownerId, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ownerData: data, token: token });
    })
  }
};


// HELPER METHODS -----------------

const findUser = (userId) => {
  return Users.findById(userId)
}

const retrieveImgData = (req) => {
  return {
    fileName: req.file.filename,
    contentType: req.file.mimetype,
  }
}

const buildPostData = async (req) => {
  const post = new Post();
  const user = await findUser(req.user_id)
  
  post.createdBy = user
  post.message = req.body.post
  if (req.file) { post.image = retrieveImgData(req) }
  return post
}

module.exports = PostsController;
