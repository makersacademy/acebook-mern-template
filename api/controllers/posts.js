const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
    Index: (req, res) => {
        Post.find(async (err, posts) => {
            if (err) {
                // TODO: Create error handler needs to be tested
                throw err;
            }
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(200).json({posts: posts, token: token});
        });
    },
    FindPostById: (req, res) => {
        // TODO: Find by post_id needs to be tested
        // Extract post_id from params (Taken from :post_id in the url)
        let post_id = req.params.post_id
        // Use post_id to find particular post
        Post.findById({_id:post_id}, async (err, post) => {
            if (err) {
                throw err;
            }
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            // returns a body containing the post object and token string
            res.status(200).json({post, token});
        });
    },
    Create: (req, res) => {
        const post = new Post(req.body);
        post.save(async (err) => {
            if (err) {
                // TODO: Create error handler needs to be tested
                throw err;
            }
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(201).json({message: 'OK', token});
        });
    },
    CreateComment: (req, res) => {
        // TODO: CreateComment needs to have tests added
        let {params: {post_id}, body: {user_id,content}} = req
        // user_id and content are the properties of a comment object and must always be sent.
        Post.findById({_id: post_id}, async (err, post) => {
            if (err) {
                throw err;
            }
            // This pushes the new comment object into the comments array in the post object
            post.comments.push({content,user_id})
            // saves the change to the comments property in post object
            await post.save()
            const token = await TokenGenerator.jsonwebtoken(user_id)
            res.status(201).json({message: 'OK', token});
        });
    },
};

module.exports = PostsController;
