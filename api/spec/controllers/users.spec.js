const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

const createTestUser = async (testUserInfoObject) => {
  let response = await request(app).post("/users").send(testUserInfoObject);
  return response;
};

const getMostRecentlyCreatedUser = async () => {
  let users = await User.find();
  return users[users.length - 1];
};

const numberOfExistingUsers = async () => {
  let users = await User.find();
  return users.length;
}

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when display name, email, and password are provided", () => {
    test("the response code is 201", async () => {
      const userInfo = {
        displayName: "Poppy Python",
        email: "poppy@email.com",
        password: "1234",
      }
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      const userInfo = {
        displayName: "Scarlett Scala",
        email: "scarlett@email.com",
        password: "1234",
      }
      await createTestUser(userInfo);
      let newUser = await getMostRecentlyCreatedUser();
      expect(newUser.displayName).toEqual("Scarlett Scala");
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const userInfo = {
        displayName: "Skye Swift",
        email: "skye@email.com",
      }
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      const userInfo = {
        displayName: "Skye Swift",
        email: "skye@email.com",
      }
      await createTestUser(userInfo);
      expect(await numberOfExistingUsers()).toEqual(0);
    });
  });

  describe("POST, when display name is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "james@email.com", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ email: "james@email.com", password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ displayName: "Emily Erlang", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ displayName: "Emily Erlang", password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("GET, when token is missing", () => {
    it("does not return a user", async () => {
      
    });
  });
});
