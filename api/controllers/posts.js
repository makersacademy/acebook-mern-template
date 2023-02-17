const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const upload = require("../config/multer");
const cloudinary = require("cloudinary").v2;

const PostsController = {
  Index: async (req, res) => {
    try {
      const posts = await Post.find();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  Create: async (req, res) => {
    try {
      const { message, imageURL, userName, profilePicture } = req.body;
  
      const post = new Post({
        message: message,
        userName: userName,
        imageURL: imageURL,
        profilePicture: profilePicture });

      await post.save();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  Delete: async (req, res) => {
    try {
      const postId = req.params.id;
      await Post.deleteOne({ _id: postId });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Post deleted successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
  
  Addlike: (req, res) => {
    console.log(req.body.postId, req.body.userId);
    Post.findById(req.body.postId, (err, post) => {
        if (err) {
            return res.status(422).json({ error: err });
        }
        if (post.likes.includes(req.body.userId)) {
            return res.status(422).json({ error: 'User has already liked this post' });
        }
        Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.body.userId }
        }, {
            new: true
        }).exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err });
            } else {
                res.json(result);
            }
        });
    });
},


Unlike: (req, res) => {
  console.log(req.body.postId,req.body.userId);
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.body.userId}
  },{
    new:true
  }).exec((err,result) => {
      if(err){
        return res.status(422).json({error:err})
      }else{
        res.json(result)
      }
  })
},

  AddComment: async (req, res) => {
    try {
      const postId = req.params.id;
      const message = req.body.message;
      const userName = req.body.userName;
      await Post.updateOne(
        { _id: postId },
        {
          $push: {
            comments: {
              userName: userName,
              timeStamp: Date.now(),
              message: message,
            },
          },
        }
      );
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: "Comment added successfully", token: token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message })
    }
  },


  AddImage: async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      res.json({message : "Image uploaded successfully", url: result.secure_url })
      return result.secure_url

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = PostsController;
