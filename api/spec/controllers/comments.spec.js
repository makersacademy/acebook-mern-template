const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const Post = require("../../models/post");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;
let post;

describe("/comments", () => {
  beforeAll(async () => {
    user = new User({
      email: "test@gmail.com",
      password: "password",
      username: "TestUser",
      followers: [],
      photograph: "",
      posts: [],
      comments: [],
    });

    await user.save();

    post = new Post({ content: "Hello World", author: user._id });
    await post.save();


    token = JWT.sign(
      {
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({})
  });

  describe("POST /comments", () => {
    describe("When token is present", () => {
      test("responds with a 201", async () => {

        const response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({
            content: "Great comment",
            author: user._id,
            post_id: post._id,
            token: token,
          });
        console.log(response.body)
        expect(response.status).toEqual(201);
      });

      test("create a new comment", async () => {
        await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({
            content: "Great comment",
            author: user._id,
            post_id: post._id,
            token: token,
          });
        let comments = await Comment.find();
        expect(comments.length).toEqual(1);
        expect(comments[0].content).toEqual("Great comment");
      } )

      test("returns a new token", async () => {

        let response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({
            content: "Great comment",
            author: user._id,
            post_id: post._id,
            token: token,
          });
        let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
        let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
        expect(newPayload.iat > originalPayload.iat).toEqual(true);
      });
    });

    describe("When token is missing", () => {
      test("responds with a 401", async () => {
        let response = await request(app)
          .post("/comments")
          .send({
            content: "Great comment",
            author: user._id,
            post_id: post._id,
            token: token,
          });
        expect(response.status).toEqual(401);
      });
    })
  });
});
