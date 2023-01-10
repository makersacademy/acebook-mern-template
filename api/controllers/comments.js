const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const CommentsController = {
  AddComment: (req, res) => {
    Post.findByIdAndUpdate(
      req.body.id,
      { $push: { comments: { text: req.body.message } } },
      { new: true },
      async function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated Post : ', docs);
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: 'OK', token: token });
      }
    );
  },
};

module.exports = CommentsController;
