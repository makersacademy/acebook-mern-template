const assert = require("assert");
const request = require("supertest");
require("../mongodb_helper");
const app = require("../../app");
const mongoose = require("mongoose");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const Post = require("../../models/post");
const JWT = require("jsonwebtoken");

let token;
let user;

describe("/comments",() => {
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
  
    token = JWT.sign(
      {
        user_id: user._id,
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      process.env.JWT_SECRET
    );
  
  });
  
  beforeEach(async () => {
  
    await Comment.deleteMany({});
    console.log("beforeEach40")
  });
  
  afterAll(async () => {
  
    await User.deleteMany({});
    await mongoose.disconnect();
  });
  
  describe("POST /comments", () => {
    describe("When token is present", () => {
      test("responds with a 201", async () => {
        const post = new Post({content: "Hello World", author: user._id})
        console.log(user)
        await post.save()
        const response = await request(app)
          .post("/comments")
          .set("Authorization", `Bearer ${token}`)
          .send({ content: "Great comment", author: user._id, post_id: post._id, token: token });
  
        assert.strictEqual(response.status, 201);
      });
  
  
  
  
    });
})

});




