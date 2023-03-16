const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  ToggleLike: (req, res) => {
    Comment.findOne({ _id: req.params.id }).then(async (comment) => {
      let liked;
      if (comment.likes.includes(req.user_id)) {
        //checks database  (likes array) for existing user_id removes a match -displays like removed
        comment.likes.splice(comment.likes.indexOf(req.user_id), 1);
        console.log("Like removed");
        liked = false;
      } else {
        //saves user_id to database and displays- Like added
        comment.likes.push(req.user_id);
        console.log("Like added");
        liked = true;
      }
      comment.save(async (err, comment) => {
        if (err) {
          throw err;
        } //if successful  generates a new JWT which has following property
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({
          token: token,
          message: "OK",
          likes: comment.likes.length, //No of likes
          liked: liked, //displays boolean  Liked status
        });
      });
    });
  },
};

module.exports = CommentsController;
