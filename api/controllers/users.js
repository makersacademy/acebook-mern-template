const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator")

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  AddOrRemovePostIdtoUserifLikedOrUnliked: async (req, res) => {
    const user = req.user_id
    console.log(`REQ.USERID ${user}`) // NEED TO WORK ON THIS TOMORROW!
    const postId = req.body.postId;
    const userId = req.params.id;
    console.log(`POSTID ${postId}`)
    console.log(`USERID ${userId}`)
    try{
      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the post ID is in the likedPostIds array
      const index = user.likedPostIds.indexOf(postId);

      if (index === -1) {
        // If not found, add the post ID
        user.likedPostIds.push(postId);
        user.save();
        console.log(`UPDATED IDs: ${user}`)

                // Send the response
                const token = TokenGenerator.jsonwebtoken(userId);
                const user = req.user_id
                console.log(`REQ.USERID ${user}`)
                return res.status(201).json({
                  message: 'PostId added successfully',
                  token: token,
                  likedPostIds: user.likedPostIds,
                });
    } else {
      // If found, remove the post ID
      user.likedPostIds.splice(index, 1);
      user.save();
      console.log(`UPDATED IDs AFTER REMOVAL: ${user}`)

              // Send the response
              const token = TokenGenerator.jsonwebtoken(userId);
              return res.status(201).json({
                message: 'PostId removed successfully',
                token: token,
                likedPostIds: user.likedPostIds
              });
            }
          } catch (err) {
            console.error('Error updating likedPostIds:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        },
      };

module.exports = UsersController;
