
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment')
const JWT = require("jsonwebtoken");
const { post } = require("superagent");
const secret = process.env.JWT_SECRET;
const mongoose = require('mongoose');

let token;

describe("/comments", () => {
  beforeAll( async () => {
    const user = new User({
      email: "test31@test.com", 
      username: "test31username", 
      password: "1234567890"
		});
		user_id = user._id;
    const post = new Post({
    	message: "testing comments"
    })
		await user.save();
		post_id = post._id;
		await post.save();
		
    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Comment.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
  })

  describe("POST, when token is present", () => {
      test("responds with a 201", async () => {
      let response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({post: post_id, user: user_id, comment: "testing comments", token: token });
			expect(response.status).toEqual(201);
			});
		
			test("creates a new comment", async () => {
				await request(app)
					.post("/comments")
					.set("Authorization", `Bearer ${token}`)
					.send({post: post_id, user: user_id, comment: "hello world", token: token  });
				let comments = await Comment.find();
				expect(comments.length).toEqual(1);
				expect(comments[0].comment).toEqual("hello world");
			});
			
		
			test("creates a comment linked to the user", async () => {
				await request(app)
					.post("/comments")
					.set('Authorization', `Bearer ${token}`)
					.send({post: post_id, user: user_id, comment: "hello world", token: token  })
				const comments = await Comment.findOne();
				// Assert comment is linked to user
				expect(JSON.stringify(user_id)).toEqual(JSON.stringify(comments.user));
			});
		
			test("creates a comment linked to the post", async () => {
				await request(app)
					.post("/comments")
					.set('Authorization', `Bearer ${token}`)
					.send({post: post_id, user: user_id, comment: "hello world", token: token  })
				const comments = await Comment.findOne();
				// Assert comment is linked to user
				expect(JSON.stringify(post_id)).toEqual(JSON.stringify(comments.post));
			});
			test("returns a new token", async () => {
				let response = await request(app)
					.post("/comments")
					.set("Authorization", `Bearer ${token}`)
					.send({post: post_id, user: user_id, comment: "hello world", token: token  })
				let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
				let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
				expect(newPayload.iat > originalPayload.iat).toEqual(true);
			});
	});
	describe("POST, when token is missing", () => {
		test("responds with a 401", async () => {
			let response = await request(app)
				.post("/comments")
				.send({post: post_id, user: user_id, comment: "hello world"});
			expect(response.status).toEqual(401);
		});
		test("a comment is not created", async () => {
			await request(app)
				.post("/comments")
				.send({ post: post_id, user: user_id, comment: "hello world" });
			let comments = await Comment.find();
			expect(comments.length).toEqual(0);
		});
		test("a token is not returned", async () => {
			let response = await request(app)
				.post("/comments")
				.send({ post: post_id, user: user_id, comment: "hello world" });
			expect(response.body.token).toEqual(undefined);
		});
  });
	
	describe("GET, when token is present", () => {
		test("returns every comment in the collection", async () => {
			let comment1 = new Comment({ post: post_id, user: user_id, comment: "hello men" });
			let comment2 = new Comment({ post: post_id, user: user_id, comment: "hello women" });
			await comment1.save();
			await comment2.save();
			let response = await request(app)
				.get("/comments")
				.set("Authorization", `Bearer ${token}`)
				.send({ token: token });
			expect(response.status).toEqual(200);
			let comments = response.body.comments.map((comment) => comment.comment);
			expect(comments).toEqual(["hello men", "hello women"]);
		});
		test("returns a new token", async () => {
			let comment1 = new Comment({ post: post_id, user: user_id, comment: "hello men" });
			let comment2 = new Comment({ post: post_id, user: user_id, comment: "hello women" });
			await comment1.save();
			await comment2.save();
			let response = await request(app)
				.get("/comments")
				.set("Authorization", `Bearer ${token}`)
				.send({ token: token });
			let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
			let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
			expect(newPayload.iat > originalPayload.iat).toEqual(true);
			});
	});
	describe("GET, when token is missing", () => {
    test("returns no comments, error 401 and no token", async () => {
			let comment1 = new Comment({ post: post_id, user: user_id, comment: "hello men" });
			let comment2 = new Comment({ post: post_id, user: user_id, comment: "hello women" });
			await comment1.save();
			await comment2.save();
      let response = await request(app).get("/comments");
			expect(response.status).toEqual(401);
      expect(response.body.comments).toEqual(undefined);
			expect(response.body.token).toEqual(undefined);
    });
	});	
	describe("DELETE, when token is present", () => {
		test("delete a comment by comment's author with 200 response", async () => {
			const userId = mongoose.Types.ObjectId();
			const post = new Post({ message: "Пост с комментариями", user: userId });
    		await post.save();
			const comment = new Comment({post: post_id, user: user_id, comment: "comment to delete"});
			await comment.save();
			// Send a request to delete the comment
			const response = await request(app)
				.delete(`/comments/${comment._id}`)
				.set('Authorization', `Bearer ${token}`)
			// Check the response status
			expect(response.status).toEqual(200);
			// Check if the comment is deleted from the database
			const deleted_comment = await Comment.findById(comment._id);
			expect(deleted_comment).toBe(null);
		});
		test("delete a comment by post's author with 200 response", async () => {
			const userId = mongoose.Types.ObjectId();
			const post = new Post({ message: "Post with comments", user: user_id });
			await post.save();
			const comment = new Comment({post: post._id, user: userId, comment: "comment to delete"});
			await comment.save();
			// Send a request to delete the comment
			const response = await request(app)
				.delete(`/comments/${comment._id}`)
				.set('Authorization', `Bearer ${token}`)
			// Check the response status
			expect(response.status).toEqual(200);
			// Check if the comment is deleted from the database
			const deleted_comment = await Comment.findById(comment._id);
			expect(deleted_comment).toBe(null);
			// Check if the response includes a new token
			expect(response.body.token).toBeDefined();
		});
		test("returns a new token", async () => {
			let comment = new Comment({post: post_id, user: user_id, comment: "comment to delete"});
			await comment.save();
			const response = await request(app)
				.delete(`/comments/${comment._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ token: token });
			let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
			let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
			expect(newPayload.iat > originalPayload.iat).toEqual(true);
		});
	});
	describe("DELETE, when token is missing", () => {
		test("other user can't delete comment, 403 response", async () => {
			const userId = mongoose.Types.ObjectId();
			const post = new Post({ message: "Post with comments", user: userId });
			await post.save();
			const comment = new Comment({post: post._id, user: userId, comment: "comment to delete"});
			await comment.save();
			console.log("other user can't delete comment")
			console.log('Post author', post.user);
			console.log('Comment Author', comment.user);
			console.log('Current User', user_id);
			// Send a request to delete the comment
			const response = await request(app)
				.delete(`/comments/${comment._id}`)
				.set('Authorization', `Bearer ${token}`)
			// Check the response status
			expect(response.status).toEqual(403);
			// Check if the comment is still in the database
			expect(Comment.findById(comment._id)).not.toBe(null);
		});
		test("a token is not returned", async () => {
			const userId = mongoose.Types.ObjectId();
			const postId = mongoose.Types.ObjectId();
			const comment = new Comment({post: postId, user: userId, comment: "comment to delete"});
			await comment.save();
			// Send a request to delete the comment
			const response = await request(app)
				.delete(`/comments/${comment._id}`)
				.set('Authorization', `Bearer ${token}`)
				.send({ token: token });
			expect(response.body.token).toEqual(undefined);
		});
	});
});
