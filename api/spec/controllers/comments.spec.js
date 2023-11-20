const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Comment = require("../../models/comment");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;
let post;

describe("/posts", () => {
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
      await User.deleteMany({});
      await Post.deleteMany({});
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
    // });
  
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
  
    // describe("GET, when token is present", () => {
    //   test("returns every post in the collection", async () => {
    //     let post1 = new Post({ message: "howdy!" });
    //     let post2 = new Post({ message: "hola!" });
    //     await post1.save();
    //     await post2.save();
    //     let response = await request(app)
    //       .get("/posts")
    //       .set("Authorization", `Bearer ${token}`)
    //       .send({ token: token });
    //     let messages = response.body.posts.map((post) => post.message);
    //     expect(messages).toEqual(["howdy!", "hola!"]);
    //   });
  
  //     test("the response code is 200", async () => {
  //       let post1 = new Post({ message: "howdy!" });
  //       let post2 = new Post({ message: "hola!" });
  //       await post1.save();
  //       await post2.save();
  //       let response = await request(app)
  //         .get("/posts")
  //         .set("Authorization", `Bearer ${token}`)
  //         .send({ token: token });
  //       expect(response.status).toEqual(200);
  //     });
  
  //     test("returns a new token", async () => {
  //       let post1 = new Post({ message: "howdy!" });
  //       let post2 = new Post({ message: "hola!" });
  //       await post1.save();
  //       await post2.save();
  //       let response = await request(app)
  //         .get("/posts")
  //         .set("Authorization", `Bearer ${token}`)
  //         .send({ token: token });
  //       let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
  //       let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
  //       expect(newPayload.iat > originalPayload.iat).toEqual(true);
  //     });
  //   });
  
  //   describe("GET, when token is missing", () => {
  //     test("returns no posts", async () => {
  //       let post1 = new Post({ message: "howdy!" });
  //       let post2 = new Post({ message: "hola!" });
  //       await post1.save();
  //       await post2.save();
  //       let response = await request(app).get("/posts");
  //       expect(response.body.posts).toEqual(undefined);
  //     });
  
  //     test("the response code is 401", async () => {
  //       let post1 = new Post({ message: "howdy!" });
  //       let post2 = new Post({ message: "hola!" });
  //       await post1.save();
  //       await post2.save();
  //       let response = await request(app).get("/posts");
  //       expect(response.status).toEqual(401);
  //     });
  
  //     test("does not return a new token", async () => {
  //       let post1 = new Post({ message: "howdy!" });
  //       let post2 = new Post({ message: "hola!" });
  //       await post1.save();
  //       await post2.save();
  //       let response = await request(app).get("/posts");
  //       expect(response.body.token).toEqual(undefined);
  //     });
  //   });
  });
  