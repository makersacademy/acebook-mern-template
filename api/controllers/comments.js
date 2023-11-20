const TokenGenerator = require("../lib/token_generator");
const Comment = require("../models/comment");

const CommentsController = {
  Create: (req, res) => {
    const user_id = req.user_id;
    const post_id = req.params.post_id;
    const comment = new Comment ({
      ...req.body,
      user_id: user_id,
      post_id: post_id
    })
    comment.save((err) => {
      if (err) {
        throw err;
      }
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: "OK", token: token });
    });
  }
}

module.exports = CommentsController

// create
// find/index comments by post_id
// 