const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  //finds a post with post_id
  Index: (req, res) => {
    Comments.find(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.post_id)
      res.status(200).json({ comments: comments, token: token });
    });
  },
  Create: (req, res) => {
    //we need a used_id in the object we pass to new Comment. The object needs to look the same as the model
    const commentBody = req.body;
    //in the frontend, we need to pass post_id and content to our Comment component
    commentBody.user_id = req.user_id;
    //we create an instance of the Comment model
    const comment = new Comment(commentBody);
    //we save it to the database 
    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      //express returns a response object. We set that to a success here
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = CommentsController;
