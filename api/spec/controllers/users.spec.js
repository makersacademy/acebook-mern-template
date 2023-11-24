const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

let user;

describe("/api/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({ email: "poppy@email.com", password: "Password1!" });
      expect(response.statusCode).toBe(201);
    });
    it("", () => {});
    test("a user is created", async () => {
      await request(app)
        .post("/api/users")
        .send({ email: "scarlett@email.com", password: "Password1!" });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({ email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/api/users").send({ email: "skye@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/api/users")
        .send({ password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/api/users").send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });
});

describe("/api/users/:userId", () => {
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
  });
  describe("With valid user id.", () => {
    test("the response code is 200", async () => {
      let response = await request(app)
        .get(`/api/users/${user._id}`)
      expect(response.statusCode).toBe(200);
    });

    test("User data match", async () => {
      let response = await request(app)
        .get(`/api/users/${user._id}`)
      expect(response.body.user.username).toEqual("TestUser");
    });
  })

  describe("With invalid user id.", () => {
    test("the response code is 500", async () => {
      let response = await request(app)
        .get("/api/users/ab567")
      expect(response.statusCode).toBe(500);
    });

    test("User is not returned", async () => {
      let response = await request(app)
        .get("/api/users/${ab567}")
      expect(response.body.user).toEqual(undefined);
    });
  })
});
