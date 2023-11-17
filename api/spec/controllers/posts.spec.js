const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const { log } = require("console");
const secret = process.env.JWT_SECRET;

let token;
let user;
let post1;
let post2;

describe("/api/posts", () => {
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
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "hello world", author: user._id, token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "hello world", author: user._id, token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].content).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "hello world", author: user._id, token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/api/posts")
        .send({ content: "hello world", author: user._id, token: token });
      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app)
        .post("/api/posts")
        .send({ content: "hello world", author: user._id, token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/api/posts")
        .send({ content: "hello world", author: user._id, token: token });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.content);
      expect(messages).toEqual(["howdy!", "hola!"]);
    });

    test("the response code is 200", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/api/posts");
      expect(response.body.posts).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/api/posts");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let post1 = new Post({ content: "howdy!", author: user._id });
      let post2 = new Post({ content: "hola!", author: user._id });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/api/posts");
      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("GET api/post/:userId", () => {
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

    post1 = new Post({ content: "test1", author: user._id });
    post1.save();
    post2 = new Post({ content: "test2", author: user._id });
    post2.save();

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

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("When token is present", () => {
    test("responds with 200", async () => {
      let response = await request(app)
        .get(`/api/posts/${user._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      let response = await request(app)
        .get(`/api/posts/${user._id}`)
        .set("Authorization", `Bearer ${token}`);
      let contents = response.body.posts.map((post) => post.content);
      expect(contents).toEqual(["test1", "test2"]);
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .get(`/api/posts/${user._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("When the token is missing", () => {
    test("responds with 400", async () => {
      let response = await request(app).get(`/api/posts/${user._id}`);
      expect(response.status).toEqual(401);
    });

    test("doesn't return new token", async () => {
      let response = await request(app).get(`/api/posts/${user._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });
});
