const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");
// TODO: test through postman as well
const CommentsController = {
  Create: (req, res) => {
    const comment = new Comment(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Find_By_Post_Id: (req, res) => {
    let {body:{post_id}} = req
    Comment.find({post_id},async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({  comments, token });
    });
  },
};


module.exports = CommentsController;
