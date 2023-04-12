const Post = require("../models/post");
const Users = require("../models/user");
const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");

const CommentsController = {
  
  Create: async (req, res) => {
    const comment = await buildCommentData(req) // method further down

    comment.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  GetCommentsByPostId: async (req, res) => {
    const post = await Post.findById(req.params.postId);

    Comment.find({ postId: post }, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({comments: data, token: token });
    }).sort({ createdAt: -1 });
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

const buildCommentData = async (req) => {
  const comment = new Comment();
  const user = await findUser(req.user_id);
  const post = await Post.findById(req.body.postId);

  comment.createdBy = user
  comment.message = req.body.comment
  comment.postId = post
  if (req.file) { post.image = retrieveImgData(req) }
  return comment
}

module.exports = CommentsController;
