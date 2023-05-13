const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");

const Comment = require("../../models/comment");
const User = require("../../models/user");

const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/comments", () => {
  beforeAll(async () => {
    const user = new User({
      email: "test@test.com",
      password: "12345678",
      username: "username",
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
    await Comment.deleteMany({});
  });

  afterAll(async () => {
    await Comment.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      const mongoose = require('mongoose');
      const postId = mongoose.Types.ObjectId();
      let response = await request(app)
        .post("/comments")
        .send({ comment: "hello world", postId: postId });
      expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      await request(app)
        .post("/comments")
        .send({ comment: "hello world", postId: '645a4b325527a53115f9bfef' });
      let comments = await Comment.find();
      console.log(comments)
      expect(comments.length).toEqual(1);
      expect(comments[0].comment).toEqual("hello world");
    });
  });
});