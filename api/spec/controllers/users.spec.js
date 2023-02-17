const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app).post("/users").send({
        email: "poppy@email.com",
        password: "1234",
        firstName: "John",
        lastName: "Smith",
      });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app).post("/users").send({
        email: "scarlett@email.com",
        password: "1234",
        firstName: "John",
        lastName: "Smith",
      });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app).post("/users").send({
        email: "skye@email.com",
        firstName: "John",
        lastName: "Smith",
      });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({
        email: "skye@email.com",
        firstName: "John",
        lastName: "Smith",
      });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ password: "1234", firstName: "John", lastName: "Smith" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ password: "1234", firstName: "John", lastName: "Smith" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("Find user by email", () => {
    it("should return 200 and the found user if the user exists", async () => {
      await request(app).post("/users").send({
        email: "scarlett@email.com",
        password: "1234",
        firstName: "John",
        lastName: "Smith",
      });
      const response = await request(app)
        .get("/users")
        .query({ email: "scarlett@email.com" });

      expect(response.statusCode).toBe(200);
      expect(response.body.user.email).toEqual("scarlett@email.com");
      expect(response.body.user.firstName).toEqual("John");
      expect(response.body.user.lastName).toEqual("Smith");
    });

    it("should return 404 if the user doesn't exist", async () => {
      const response = await request(app)
        .get("/users")
        .query({ email: "notfound@email.com" });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual("User not found");
    });
  });
});
