
const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const Comment = require('../../models/comment')
const JWT = require("jsonwebtoken");
const { post } = require("superagent");
const secret = process.env.JWT_SECRET;

let token;
let post_id;
let user_id;

describe("/comments", () => {
  beforeAll( async () => {
    const user = new User({
      email: "test31@test.com", 
      username: "test31username", 
      password: "1234567890"
		});
		user_id = user.id;
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

  describe("Comment, when token is present", () => {
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

		
 
  })
});
