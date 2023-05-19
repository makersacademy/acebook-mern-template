const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/posts", () => {  

  let registeredUser;
  beforeAll( async () => {
    const user = new User({email: "test@test.com", password: "12345678", userName: "testuser"});
    await user.save();
    registeredUser = User.findOne()
    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Post.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  })

  describe("LIKE, when token is present", () => {
    test("responds with a 200 and returns a new token, and the number of likes of post", async () => {
      // We first create a new post to be able to like it
      let post1 = new Post({message: "howdy!", likes:5});
      await post1.save();
      let post_id = (await Post.find())[0].id;
      // Use the ID as part of the request going to backend
      let response = await request(app)
        .post("/posts/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post_id, token: token });
      expect(response.status).toEqual(200);
      expect(response.body.likes).toEqual(6)
      // Check if the response sends a new token
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("LIKE, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts/like")
        // post ID does not matter here, as we expect to get stuck at token checks
        .send({ post_id: 1, token: token });
      expect(response.status).toEqual(401);
    });
  });

  describe("UNLIKE, when token is present", () => {
    test("responds with a 200 and returns a new token, and the number of likes of post", async () => {
      // We first create a new post to be able to like it
      let post1 = new Post({message: "howdy!", likes:5});
      await post1.save();
      let post_id = (await Post.find())[0].id;
      // Use the ID as part of the request going to backend
      let response = await request(app)
        .post("/posts/unlike")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post_id, token: token });
      expect(response.status).toEqual(200);
      expect(response.body.likes).toEqual(4)
      // Check if the response sends a new token
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("UNLIKE, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts/unlike")
        // post ID does not matter here, as we expect to get stuck at token checks
        .send({ post_id: 1, token: token });
      expect(response.status).toEqual(401);
    });
  });

  describe("GET POSTS to determine which ones user already liked or not", () => {
    test("returns didUserLikeThis: true if user liked the post", async () => {
      const user = await User.findOne()
      let post1 = new Post({message: "howdy!", author: user.id});
      let post2 = new Post({message: "hola!", author: user.id});
      await post1.save();
      await post2.save();
      let post_id = (await Post.find())[0].id;
      // We like the first post using the post_id from line above
      await request(app)
        .post("/posts/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post_id, token: token });

      // A get request to receive all posts
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let messages = response.body.posts
      // didUserLikeThis only gets generated if user likes a post and returns true
      // for post the user liked
      expect(messages[0].didUserLikeThis).toEqual(true)
      // user did not like this, so it returns undefined
      expect(messages[1].didUserLikeThis).toEqual(undefined)
    });
  });
});