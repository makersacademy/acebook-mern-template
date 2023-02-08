const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// let token;

describe("/posts", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });
  afterAll(async () => {
    await Post.deleteMany({});
  });
  describe("GET - users", () => {
    test("returns 401 when token missing", async () => {
      let response = await request(app).get("/users");
      expect(response.status).toEqual(401);
    });
    test("returns 1 post of user when token passed", async () => {
      const user = new User({ email: "test@test.com", password: "12345678" });
      await user.save();
      user_id = user._id;
      token = JWT.sign(
        {
          user_id: user.id,
          iat: Math.floor(Date.now() / 1000) - 5 * 60,
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
        },
        secret
      );
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: user_id, message: "hello world" });
      let response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
