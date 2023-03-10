const request = require("supertest");
const app = require("../../app");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when username, email and password are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app).post("/users").send({
        username: "poppy",
        email: "poppy@email.com",
        password: "1234",
      });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
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
});
