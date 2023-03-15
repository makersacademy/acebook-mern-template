const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../../app");
require("../mongodb_helper");
const User = require("../../models/user");

let token;

const generateBackdatedToken = (userId) =>
  jwt.sign(
    {
      userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    process.env.JWT_SECRET
  );

const dropUsers = async () => {
  const collection = mongoose.connection.collections.users;
  try {
    await collection.drop();
  } catch (error) {
    if (error.message === "ns not found") return;
    if (error.message.includes("a background operation is currently running"))
      return;
    console.log(error.message);
  }
};

describe("/users", () => {
  beforeEach(async () => {
    await dropUsers();
  });

  afterAll(async () => {
    await dropUsers();
  });

  describe("POST, when username, email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        name: "Poppy Pop",
        username: "poppy",
        email: "poppy@email.com",
        password: "1234",
      });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        name: "Scarlett Scar",
        username: "scarlett",
        email: "scarlett@email.com",
        password: "1234",
      });
      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ username: "sky", email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });
      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ username: "abi", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ username: "abi", password: "1234" });
      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST when username is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "chris@email.com", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ email: "chris@email.com", password: "1234" });
      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const user = new User({
        name: "Poppy Pop",
        username: "poppy",
        email: "poppy@email.com",
        password: "1234",
      });
      await user.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toEqual(200);
    });

    test("returns the corresponding user", async () => {
      const user = new User({
        name: "Poppy Pop",
        username: "poppy",
        email: "poppy@email.com",
        password: "1234",
      });
      await user.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.user).toMatchObject({
        name: "Poppy Pop",
        username: "poppy",
      });
    });

    test("returns a new token", async () => {
      const user = new User({
        name: "Poppy Pop",
        username: "poppy",
        email: "poppy@email.com",
        password: "1234",
      });
      await user.save();
      token = generateBackdatedToken(user.id);

      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      const newPayload = jwt.decode(
        response.body.token,
        process.env.JWT_SECRET
      );

      const originalPayload = jwt.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toEqual(401);
    });

    test("a user is not returned", async () => {
      const response = await request(app).get("/users");
      expect(response.body.user).toEqual(undefined);
    });

    test("a token is not returned", async () => {
      const response = await request(app).get("/users");
      expect(response.body.token).toEqual(undefined);
    });
  });
});
