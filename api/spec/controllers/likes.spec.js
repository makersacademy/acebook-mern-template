const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/likes", () => {
  beforeAll(async () => {
    user = new User({ email: "test@test.com", password: "12345678" });
    await user.save();
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
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hello world", token: token });
    let posts = await Post.find();
    let postID = posts[0]._id;

    await request(app)
      .post(`/likes/${postID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });

    let response = await request(app)
      .get(`/posts/${postID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    let body = response.body;
    expect(body.post.likes.length).toEqual(1);
  });
});
