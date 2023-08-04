const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const TokenGenerator = require("../../lib/token_generator");


let token;

describe("/posts", () => {
  beforeAll(async () => {
    user = new User({
      email: "test@test.com",
      username: "testusername",
      password: "12345678",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  })
  
  describe("PUT, when token is present", () => {
    test("response with a 200, and message updated", async () => {
      const post = new Post({ message: "test  post 1", user: user._id});

      await post.save();
      const updatedMessage = "updated message";
      // Perform the PUT request with the correct headers
      let response = await request(app)
        .put(`/posts/${post.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: updatedMessage });
      expect(response.status).toEqual(200);
      // Retrieve the updated post from the database and check if the message is updated
      const updatedPost = await Post.findById(post.id);
      expect(updatedPost.message).toEqual("updated message");
    });



    test("response with an auth error if wrong user, and message consequently does not update", async () => {
      const post = new Post({ message: "test post 2", user: user._id });
      await post.save();
      const updatedMessage = "updated message";
      // Perform the PUT request with the correct headers
      // Create a different user and generate a token for them
      const anotherUser = new User({
        email: "another@test.com",
        username: "anotheruser",
        password: "12345678",
      });
      await anotherUser.save();
      const anotherToken = TokenGenerator.jsonwebtoken(anotherUser._id);
      let response = await request(app)
        .put(`/posts/${post.id}`)
        .set("Authorization", `Bearer ${anotherToken}`)
        .send({ message: updatedMessage });
      expect(response.status).toEqual(401);
      const updatedPost = await Post.findById(post.id);
      expect(updatedPost.message).toEqual("test post 2");
    });

  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });

    test("creates a post linked to the user", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "hello world",
        });
      const post = await Post.findOne();
      // Assert post is linked to user
      expect(post.user).toEqual(user._id);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app).post("/posts").send({ message: "hello again world" });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      expect(messages).toEqual(["howdy!", "hola!"]);
    });

    test("the response code is 200", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.posts).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.token).toEqual(undefined);
    });
  });
  describe("DELETE, when token is present", () => {
		test("delete a post with 200 response", async () => {
      let post = new Post({ message: "to delete", user: user._id })
      await post.save();
      // Send a request to delete the posts
			const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`)
      // Check the response status
      expect(response.status).toEqual(200);
      // Check if the post is deleted from the database
      const deleted_post = await Post.findById(post._id);
      expect(deleted_post).toBe(null);
    })
  });
});
