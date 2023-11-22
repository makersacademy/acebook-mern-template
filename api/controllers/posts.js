const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  // Older version
  /*
  Create: (req, res) => {
    const userId = req.user_id;
    const post = new Post({
      ...req.body,
      userId: userId});
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  */
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      //console.log(posts);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  IndexLoggedInUser: (req, res) => {
    // req.user_id is ALWAYS the id of the *logged in user*.
    // Therefore this function ALWAYS finds the posts
    // of the *logged in user*.
    // Therefore I have renamed this function
    // from `IndexByUserId` to `IndexLoggedInUser`.
    const author = req.user_id;
    Post.find({ author: author }, (err, posts) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    try {
      // req.user_id is the id of the currently logged in user.
      // the middleware function tokenChecker sets this on the request.
      const author = req.user_id; //takes user_id from Schema
      const { message } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null //check image added

      let imageUrl = null;
      if (imageBuffer) {
        const base64Image = imageBuffer.toString('base64'); // save image as bas64 string
        imageUrl = base64Image;
      }

      const post = new Post({
        ...req.body,
        message,
        image: imageUrl,
        author: author
      });

      post.save((err) => {
        if (err) {
          throw err;
        }
      });

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    };
  },

  Comment: async (req, res) => {
    console.log("COMMENTING");
    console.log(req.params.id);
    const newComment = req.body.comment;

    try {
      // Fetch user information based on user_id
      const activeUser = await User.findById(req.user_id);
      if (!activeUser) {
        throw new Error("User not found");
      }

      // Add the comment to post.comments with the fetched username
      Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              comment_message: newComment,
              // TODO: Change this if the user is able
              // to change their displayName? Or add name updating logic?
              // (The user could change their displayName but the comment would
              // retain the previous displayName)
              displayName: activeUser.displayName, // Assuming displayName is the user's username
              commenter: req.user_id
            },
          },
        },
        { new: true },
        (err, updatedPost) => {
          if (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            console.log('Comment added successfully');
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            updatedPost.comments.forEach(comment => {
              comment.commenter = comment.displayName;
            });
            console.log(updatedPost);
            res.status(201).json({ message: 'Comment added successfully', token: token, updatedPost });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  Likes: (req, res) => {
    const newLike = req.body.likes;

    Post.findOneAndUpdate(
      { _id: req.params.id }, // Find the post by its ID
      { $inc: { likes: newLike } }, 
      { new: true }, 
      (err, updatedPost) => {
        if (err) {
          console.error('Like not added:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          console.log('Like added successfully');
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'Like added successfully', token: token, updatedPost });
        }
      }
    );
  },


GetLikes: async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const likes = post.likes;
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ likes, token });
    } catch (err) {
        console.error('Error retrieving post likes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }


};



module.exports = PostsController;
















//                                        Original code that WORKS 
  // Create: (req, res) => {
  //   const userId = req.user_id;
  //   const post = new Post({
  //     ...req.body,
  //     userId: userId});
  //   post.save((err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     const token = TokenGenerator.jsonwebtoken(req.user_id)
  //     res.status(201).json({ message: 'OK', token: token });
  //   });
  // },
  
// UploadImage
// try {
//   // Process the image (save to storage, if using a cloud service)
//   const imageBuffer = req.file.buffer; // Access image data as a Buffer
//   const base64Image = imageBuffer.toString('base64'); // Convert Buffer to base64 string

//   // Create a new post in the database with the base64-encoded image
//   const newPost = new Post({
//     message: req.body.message,
//     image: base64Image,
//     userId: req.body.userId, // Make sure to adjust this based on your actual request structure
//   });

//   // Save the new post to the database
//   const savedPost = await newPost.save();

//   // Respond with the saved post data
//   res.json(savedPost);
// } catch (error) {
//   // Handle errors and respond with an error message
//   res.status(500).json({ error: error.message });
// }
