const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password provided are valid", () => {
    test("the response code is 201 and returns a message to say signup has been successful", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "1234" });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Thanks! your account has been successfully created",
      });
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "scarlett@email.com", password: "1234" });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400 and returns error message", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message:
          "User validation failed: password: Path `password` is required.",
      });
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400 and returns error message", async () => {
      let response = await request(app)
        .post("/users")
        .send({ password: "1234" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: "User validation failed: email: Path `email` is required."
      });
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is invalid", () => {
    test("response code is 400 and it returns an error message", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "helloworld", password: "1234" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message:
          "User validation failed: email: Please use a valid email address",
      });
    });
  });

  describe("POST, when password length does not meet the minimun required length", () => {
    test("response code is 400 and it returns an error message", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "sky@yahoo.com", password: "1" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message:
          "User validation failed: password: Path `password` (`1`) is shorter than the minimum allowed length (4).",
      });
    });
  });

  describe("POST, when password length exceeds the maximum length", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          email: "sky@yahoo.com",
          password: "ThisPasswordExceedsTheMaxPasswordLength",
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message:
          "User validation failed: password: Path `password` (`ThisPasswordExceedsTheMaxPasswordLength`) is longer than the maximum allowed length (10).",
      });
    });
  });
});
