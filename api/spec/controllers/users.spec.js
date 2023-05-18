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
        .send({email: "poppy@email.com", password: "Password1234", username: "poppy"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "Password1234", username: "scarlett"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is invalid", () => {
    test("the response code is 400 with less than 8 chars", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "Pa12", username: "poppy"})
      expect(response.statusCode).toBe(400)
    })
    test("the response code is 400 with more than 8 chars", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "PPPAAAssswwwooorrrdd1234", username: "poppy"})
      expect(response.statusCode).toBe(400)
    })
  })

  describe("POST, when password is valid", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234passworD", username: "poppy"})
      expect(response.statusCode).toBe(201)
    })
    test("the response code is 201 with special chars", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234passworD!@?", username: "poppy"})
      expect(response.statusCode).toBe(201)
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
        .send({password: "Password1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "Password1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})