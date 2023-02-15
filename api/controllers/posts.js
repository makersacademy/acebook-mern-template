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
        //extract param post_id
        // TODO: Find by post_id needs to be tested
        let post_id = req.params.post_id
        Post.findById({_id:post_id}, async (err, post) => {
            if (err) {
                throw err;
            }
            console.log(post)
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
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
        Post.findById({_id: post_id}, async (err, post) => {
            if (err) {
                throw err;
            }
            post.comments.push({content,user_id})
            await post.save()
            const token = await TokenGenerator.jsonwebtoken(user_id)
            res.status(201).json({message: 'OK', token});
        });
    },
};

module.exports = PostsController;
