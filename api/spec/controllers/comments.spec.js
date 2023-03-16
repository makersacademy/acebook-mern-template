const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../app");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

let token;
let user;
let post;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET
  );

describe("/posts/comment", () => {
  beforeAll(async () => {
    user = new User({
      username: "testuser",
      email: "test@test.com",
      password: "12345678",
    });
    await user.save();

    post = new Post({
      message: "hello world",
      author: user.id,
    });
    await post.save();
    token = generateBackdatedToken(user.id);
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", postId: post.id });
      expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      await request(app)
        .post("/posts/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", postId: post.id });
      const comments = await Comment.find();
      expect(comments.length).toEqual(1);
      expect(comments[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .post("/posts/comment")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", postId: post.id, token });
      const newPayload = jwt.decode(
        response.body.token,
        process.env.JWT_SECRET
      );
      const originalPayload = jwt.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts/comment")
        .send({ message: "hello world", postId: post.id });
      expect(response.status).toEqual(401);
    });
    test("a new comment is not created", async () => {
      await request(app)
        .post("/posts/comment")
        .send({ message: "hello world", postId: post.id });
      const comments = await Comment.find();
      expect(comments.length).toEqual(0);
    });

    test("a new token is not returned", async () => {
      const response = await request(app)
        .post("/posts/comment")
        .send({ message: "hello world", postId: post.id });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    beforeEach(async () => {
      const comment1 = new Comment({
        message: "Hello",
        postId: post.id,
        author: user.id,
      });
      const comment2 = new Comment({
        message: "World",
        postId: post.id,
        author: user.id,
      });
      await comment1.save();
      await comment2.save();
    });

    afterEach(async () => {
      await Comment.deleteMany({});
    });

    test("returns every comment for a post", async () => {
      const response = await request(app)
        .get("/posts/comment")
        .query({ postId: post.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      const comments = response.body.postComments.map(
        (comment) => comment.message
      );
      expect(comments).toEqual(["Hello", "World"]);
    });

    test("the response code is 200", async () => {
      const response = await request(app)
        .get("/posts/comment")
        .query({ postId: post.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get("/posts/comment")
        .query({ postId: post.id })
        .set("Authorization", `Bearer ${token}`)
        .send({ token });
      const newPayload = jwt.decode(
        response.body.token,
        process.env.JWT_SECRET
      );
      const originalPayload = jwt.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    beforeEach(async () => {
      const comment1 = new Comment({
        message: "Hello",
        postId: post.id,
        author: user.id,
      });
      const comment2 = new Comment({
        message: "World",
        postId: post.id,
        author: user.id,
      });
      await comment1.save();
      await comment2.save();
    });

    afterEach(async () => {
      await Comment.deleteMany({});
    });

    afterAll(async () => {
      await Post.deleteMany({});
      await User.deleteMany({});
      await Comment.deleteMany({});
    });

    test("returns no comments", async () => {
      const response = await request(app).get("/posts/comment").query({
        postId: post.id,
      });
      expect(response.body.postComments).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      const response = await request(app).get("/posts/comment").query({
        postId: post.id,
      });
      expect(response.status).toEqual(401);
    });
    test("does not return a new token", async () => {
      const response = await request(app).get("/posts/comment").query({
        postId: post.id,
      });
      expect(response.body.token).toEqual(undefined);
    });
  });
});
