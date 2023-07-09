const Post = require("../models/post");
const Notification = require("../models/notification");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");
const fs = require("fs");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: async (req, res) => {
    const timeCalc = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Months are zero-based, so add 1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
      return `${hours}:${minutes} ${day}-${month}-${year}`;
    };

    try {
      const user = await User.findById(req.user_id);
      const username = user.username;

      const post = new Post({
        username: username,
        time: timeCalc(),
        message: req.body.message,
        authorId: req.user_id,
      });

      if (req.file) {
        // Handle image upload if a file is provided
        post.image.data = req.file.buffer; // You should access the buffer directly since you are using multer.memoryStorage()
        post.image.contentType = req.file.mimetype;
      }

      await post.save();
      const mentionedUsernames = req.body.message?.match(/@(\w+)/g) || [];
      for (let mentionedUsername of mentionedUsernames) {
        const mentionedUser = await User.findOne({
          username: mentionedUsername.replace("@", ""),
        });
        if (mentionedUser) {
          const notification = new Notification({
            type: "mention",
            postId: post._id,
            userId: mentionedUser._id,
            message: `You have been mentioned in a post by the user @${username}.`,
          });

          await notification.save();
        }
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, post: post }); // Return the post
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.toString() });
    }
  },
  GetImage: (req, res) => {
    console.log(req);
    Post.findById(req.params.postId, (err, post) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
      } else if (!post || !post.image.data) {
        res.status(404).send("Not found");
      } else {
        const image = Buffer.from(post.image.data, "base64");
        res.writeHead(200, {
          "Content-Type": post.image.contentType,
          "Content-Length": image.length,
        });
        res.end(image);
      }
    });
  },
};

module.exports = PostsController;
