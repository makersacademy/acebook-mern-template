const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", username: 'Fred' })
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", username: 'Fred' })
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })

  describe("GET /users/:user_Id/username", () => {
    test("returns the username of the specified user", async () => {
      // Create a new user
      const newUser = new User({
        email: "someuser@example.com",
        password: "password123",
        username: "someuser"
      });
      await newUser.save();
  
      // Make a GET request to retrieve the user's username
      const response = await request(app).get(`/users/${newUser._id}/username`);
  
      expect(response.statusCode).toBe(200);
  
      // This verifies that the response contains the correct username
      expect(response.body.username).toEqual(newUser.username);
    });
  
    test("returns 400 bad request error if user ID is invalid", async () => {
      // Make a GET request with an invalid user ID
      const invalidUserId = "invalid_user_id";
      const response = await request(app).get(`/users/${invalidUserId}/username`);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toEqual("Bad request");
    });
  
    test("returns 404 if user is not found", async () => {
      // Make a GET request with a non-existing user ID
      const nonExistingUserId = "a603fc8c183be48001c4398f";
      const response = await request(app).get(`/users/${nonExistingUserId}/username`);
  
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toEqual("User not found");
    });
  });
});