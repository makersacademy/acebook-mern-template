const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/comments", () => {
  beforeAll(async () => {
    user = new User({ email: "test@test.com", password: "12345678" });
    await user.save();
    console.log(user);
    token = JWT.sign(
      {
        user_id: user._id,
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
  });

  test("POST, when token is present", async () => {
    console.log(user);
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hello world", token: token });
    let posts = await Post.find();
    let postID = posts[0]._id;
    console.log(`** POST ID: ** ${postID}`);

    await request(app)
      .post(`/comments/${postID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ comment: "new comment", token: token });

    let response = await request(app)
      .get(`/posts/${postID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    let body = response.body.post;
    expect(body.message).toEqual("new comment");

    // let newPost = Post.findById(postID);
    // expect(newPost.comments.length).toBe(1);
  });
});
