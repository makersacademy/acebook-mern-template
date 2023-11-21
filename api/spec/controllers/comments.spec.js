const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Comment = require("../../models/comment");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let post;
let post2;
let token;
let token2;
let user;
let user2;

// Testing the create function for comments

describe("/comments - create", () => {
	beforeAll(async () => {
	// creates post to comment upon
		post = new Post({
			message: "test post"
		});
		await post.save();

	// creates user to be the author of the comments
		user = new User({
			username: "test",
			email: "test@test.com",
			password: "12345678",
			avatar: "public/images/avatars/1.svg",
		});
		await user.save();

	// creates token and sets up user_id
		token = JWT.sign(
			{
				user_id: user._id,
				// Backdate this token of 5 minutes
				iat: Math.floor(Date.now() / 1000) - 5 * 60,
				// Set the JWT token to expire in 10 minutes
				exp: Math.floor(Date.now() / 1000) + 10 * 60,
			},
			secret,
		);
	});
  
    beforeEach(async () => {
      await Comment.deleteMany({});
    });

		afterAll(async () => {
			await Comment.deleteMany({});
		});
  
    describe("POST comment, when token is present", () => {
      test("responds with a 201", async () => {
        let response = await request(app)
          .post(`/comments/${post.id}`)
          .set("Authorization", `Bearer ${token}`)
					.send({ message: "hello world", token: token });
        expect(response.status).toEqual(201);
      });


      test("creates a new comment", async () => {
			await request(app)
			.post(`/comments/${post.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({ message: "my test comment", token: token })
  
			let comments = await Comment.find();
			expect(comments.length).toEqual(1);
			expect(comments[0].message).toEqual("my test comment");
			expect(comments[0].user_id).toEqual(user._id);
			expect(comments[0].post_id).toEqual(post._id);
      });
  
      test("returns a new token", async () => {
        let response = await request(app)
					.post(`/comments/${post.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send({ message: "hello world", token: token });
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toEqual(true);
      });

  
    describe("POST new comment, when token is missing", () => {
      test("responds with a 401", async () => {
        let response = await request(app)
					.post(`/comments/${post.id}`)
          .send({ message: "another test comment" });
        expect(response.status).toEqual(401);
      });
    });

      test("a new comment is not created", async () => {
        await request(app).post(`/comments/${post.id}`).send({ message: "another test comment"});
        let comments = await Comment.find();
        expect(comments.length).toEqual(0);
      });
  
      test("a token is not returned", async () => {
        let response = await request(app)
          .post(`/comments/${post.id}`)
          .send({ message: "another test comment" });
        expect(response.body.token).toEqual(undefined);
      });
    });
});



// // ***********************************************************************

// sets up comments etc for testing findcomment by post_id

describe("/comments - find by postid", () => {
	beforeAll(async () => {
	// creates post2 to differentiate when calling
		post2 = new Post({
			message: "test post numbero 2"
		});
		await post2.save();

	// create and post by user 1- on post1
		await request(app)
			.post(`/comments/${post.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({ message: "post by user 1 on post1!", token: token });

	// create and post by user 1- on post2
		await request(app)
			.post(`/comments/${post2.id}`)
			.set("Authorization", `Bearer ${token}`)
			.send({ message: "post by user 1 on post2!", token: token });
	
	// creates second user
		user2 = new User({
			username: "test2",
			email: "test2@test.com",
			password: "123456782",
			avatar: "public/images/avatars/2.svg",
			});
		await user2.save();
		token2 = JWT.sign(
		{
			user_id: user2._id,
			// Backdate this token of 5 minutes
			iat: Math.floor(Date.now() / 1000) - 5 * 60,
			// Set the JWT token to expire in 10 minutes
			exp: Math.floor(Date.now() / 1000) + 10 * 60,
		},
		secret,
	);
			
		// create and post by user 2- on post1
		await request(app)
		.post(`/comments/${post.id}`)
		.set("Authorization", `Bearer ${token2}`)
		.send({ message: "post by user 2 on post1!", token: token2 })

		// create and post by user 2- on post2

		await request(app)
		.post(`/comments/${post2.id}`)
		.set("Authorization", `Bearer ${token2}`)
		.send({ message: "post by user 2 on post2!", token: token2 })
	});

	afterAll(async () => {
		await Comment.deleteMany({});
		await User.deleteMany({});
		await Post.deleteMany({});
	});


    describe("/comments - FindByPostId when token is present", () => {
      test("returns every comment on post1, regardless of which user posted them", async () => {

				let response = await request(app)
					.get(`/comments/${post.id}`)
					.set("Authorization", `Bearer ${token}`)
					.send({ token: token });
        let messages = response.body.comments.map((comment) => comment.message);

        expect(messages).toEqual(["post by user 1 on post1!", "post by user 2 on post1!"]);
        expect(messages.length).toEqual(2);
			})

			test("returns every comment on post2, regardless of which user posted them", async () => {
				let response = await request(app)
					.get(`/comments/${post2.id}`)
					.set("Authorization", `Bearer ${token}`)
					.send({ token: token });
        let messages = response.body.comments.map((comment) => comment.message);

        expect(messages).toEqual(["post by user 1 on post2!", "post by user 2 on post2!"]);
        expect(messages.length).toEqual(2);
			})
  
      test("the response code is 200", async () => {
        let response = await request(app)
          .get("/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ token: token });
        expect(response.status).toEqual(200);
      });
  
      test("returns a new token", async () => {
        let response = await request(app)
					.get(`/comments/${post.id}`)

          .set("Authorization", `Bearer ${token}`)
          .send({ token: token });
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toEqual(true);
      });
    });
  
    describe("GET, when token is missing", () => {
      test("returns no comments", async () => {
        let response = await request(app).get(`/comments/${post.id}`);
        expect(response.body.posts).toEqual(undefined);
      });
  
      test("the response code is 401", async () => {
        let response = await request(app).get(`/comments/${post2.id}`);
        expect(response.status).toEqual(401);
      });
  
      test("does not return a new token", async () => {
        let response = await request(app).get(`/comments/${post.id}`);
        expect(response.body.token).toEqual(undefined);
      });
    });
});