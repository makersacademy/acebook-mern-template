const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

// const addLike = (req, res) => {
//   // this method will:
//   // 1. retrieve the post using post_id
//   // 2. insert user_id into likes array
//   const data = req.body;
//   const post_id = data.post_id;
//   const user_id = req.user_id;

//   console.log("method called");
//   console.log(`post_id is ${post_id}`);
//   console.log(`user_id is ${user_id}`);

//   Post.findByIdAndUpdate(
//     post_id,
//     {
//       $push: {
//         likes: { likerId: user_id },
//       },
//     },
//     async (err) => {
//       if (err) {
//         throw err;
//       }
//       const token = await TokenGenerator.jsonwebtoken(user_id);
//       res.status(201).json({ message: "OK", token: token });
//     }
//   );
// };

const LikesController = {
  Create: (req, res) => {
    const data = req.body;
    const post_id = data.post_id;
    const user_id = req.user_id;

    console.log("method called");
    console.log(`post_id is ${post_id}`);
    console.log(`user_id is ${user_id}`);
  
    Post.findByIdAndUpdate(
      post_id,
      {
        $push: {
          likes: { likerId: user_id },
        },
      },
      async (err) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    );
  },
};

module.exports = LikesController;
