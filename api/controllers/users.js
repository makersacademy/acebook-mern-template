const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const Post = require("../models/post");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'});
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  AddOrRemovePostIdtoUserifLikedOrUnliked: async (req, res) => {
    const userId = req.user_id;
    const postId = req.body.postId;

    try{
      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the post ID is in the likedPostIds array
      const index = user.likedPostIds.indexOf(postId);

      if (index === -1) {
        // If not found, add the post ID
        user.likedPostIds.push(postId);
        user.save();

                // Send the response
                const token = TokenGenerator.jsonwebtoken(userId);
                return res.status(201).json({
                  message: 'PostId added successfully',
                  postIsLiked: true,
                  token: token,
                  likedPostIds: user.likedPostIds,
                });
    } else {
      // If found, remove the post ID
      user.likedPostIds.splice(index, 1);
      user.save();

              // Send the response
              const token = TokenGenerator.jsonwebtoken(userId);
              return res.status(201).json({
                message: 'PostId removed successfully',
                postIsLiked: false,
                token: token,
                likedPostIds: user.likedPostIds
              });
            }
          } catch (err) {
            console.error('Error updating likedPostIds:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
        },
        
        FindSingleUserById: (req, res) => {
          const userId = req.user_id; 
          User.findById(userId).select('displayName').exec((err, user) => {
            if (err) {
              // Handle error
              res.status(500).json({ error: 'Internal Server Error' });
            } else if (!user) {
              // Handle case where user is not found
              res.status(404).json({ error: 'User not found' });
            } else {
              // User found, send back the displayName
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ displayName: user.displayName });
            }
          });
        },
        
        // This function returns a *displayName*, not a user object,
        // so I've renamed it
        // - Perran
        FindSingleDisplayNameById: (req, res) => {
          const userId = req.user_id; 
          User.findById(userId).select('displayName').exec((err, user) => {
            if (err) {
              // Handle error
              res.status(500).json({ error: 'Internal Server Error' });
            } else if (!user) {
              // Handle case where user is not found
              res.status(404).json({ error: 'User not found' });
            } else {
              // User found, send back the displayName
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ displayName: user.displayName });
            }
          });
        },
        
        IndexById: (req, res) => {
          const userId = req.params.id;
          User.findById(userId).exec((err, user) => {
            //res.status(500).json({ message: `Searching for user with id ${userId}`});
            if (err) {
              res.status(500).json({ error: "Internal Server Error" });
            } else if (!user) {
              res.status(404).json({ error: "User not found" });
            } else {
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ message: "OK", user: user, token: token })
            }
          });
        }
      };

module.exports = UsersController;
