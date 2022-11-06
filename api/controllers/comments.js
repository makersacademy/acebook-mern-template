const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const CommentsController = {
  // Create: (req, res) => {
  //   const post = new Post(req.body);
  //   post.save(async (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //     res.status(201).json({ message: 'OK', token: token });
  //   });
  // },

  UpdateComment: (req, res) => {
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
// const post = new Post(req.body);
// post.save(async (err) => {
//   if (err) {
//     throw err;
//   }
//   const token = await TokenGenerator.jsonwebtoken(req.user_id);
//   res.status(201).json({ message: 'OK', token: token });
// });

// Post.findByIdAndUpdate(async (err) => {
//   '635fee24ff8189b02bbc8cf6',
//     { $push: { comments: { text: req.body.comment } } },
//     { new: true },
//     function (err, docs) {
//       if (err) {
//         // console.log(err);
//         throw err;
//       } else {
//         console.log('Updated Post comments : ', docs);
//       }
//     };
//   const token = await TokenGenerator.jsonwebtoken(req.user_id);
//   res.status(300).json({ message: 'OK', token: token, nope: req });
// });
// },

module.exports = CommentsController;
