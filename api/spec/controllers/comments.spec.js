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
      username: "test",
    });
    await user.save();

    token = JWT.sign(
      {
        user_id: user.id,
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
    await Comment.deleteMany({});
  });

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: "hello world", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new comment", async () => {
      await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: "hello world", token: token });
      let comments = await Comment.find();
      expect(comments.length).toEqual(1);
      expect(comments[0].comment).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ comment: "hello world", token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/comments")
        .send({ comment: "hello again world" });
      expect(response.status).toEqual(401);
    });

    test("a comment is not created", async () => {
      await request(app)
        .post("/comments")
        .send({ comment: "hello again world" });
      let comments = await Comment.find();
      expect(comments.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/comments")
        .send({ comment: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns every comment in the collection", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let comments = response.body.comments.map((comment) => comment.comment);
      expect(comments).toEqual(["howdy!", "hola!"]);
    });

    test("the response code is 200", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app)
        .get("/comments")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("returns no comments", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app).get("/comments");
      expect(response.body.comments).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app).get("/comments");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let comment1 = new Comment({ comment: "howdy!" });
      let comment2 = new Comment({ comment: "hola!" });
      await comment1.save();
      await comment2.save();
      let response = await request(app).get("/comments");
      expect(response.body.token).toEqual(undefined);
    });
  });
});
