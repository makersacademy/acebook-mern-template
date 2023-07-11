const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/profiles", () => {
  let testUser;

  beforeAll(async () => {
    testUser = new User({
      email: "user@testing.com",
      password: "12345678",
      username: "testUser",
    });
    await testUser.save();

    token = JWT.sign(
      {
        user_id: testUser.id,
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
  });

  describe("GET /profiles/:id, when token is present", () => {
    test("responds with a 200", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns the user profile", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.body.name).not.toBeUndefined();
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .get(`/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET /profiles/:id, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.status).toEqual(401);
    });

    test("does not return a profile", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.body).toEqual({ message: "auth error" });
    });

    test("does not return a new token", async () => {
      let response = await request(app).get(`/profiles/${testUser._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });

  // You can add more tests for other endpoints (PUT, DELETE, etc.) in a similar fashion.
});
