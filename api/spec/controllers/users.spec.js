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
        .send({
          email: "poppy@email.com",
          password: "1234",
          firstName: "Poppy",
          lastName: "Poppyson",
          userName: "pops",
        })
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          firstName: "Scarlett",
          lastName: "Scarlettson",
          userName: "scat",
        })
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          firstName: "Scarlett",
          lastName: "Scarlettson",
          userName: "scat",
        })
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          firstName: "Scarlett",
          lastName: "Scarlettson",
          userName: "scat",
        })
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          firstName: "Scarlett",
          password: "1234",
          lastName: "Scarlettson",
          userName: "scat",
        })
        expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          firstName: "Scarlett",
          password: "1234",
          lastName: "Scarlettson",
          userName: "scat",
        })
        let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when firstName is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          lastName: "Scarlettson",
          userName: "scat",
        })
        expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          lastName: "Scarlettson",
          userName: "scat",
        })
        let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when lastName is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          firstName: "Scarlett",
          userName: "scat",
        })
        expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          firstName: "Scarlett",
          userName: "scat",
        })
        let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when userName is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          firstName: "Scarlett",
          lastName: "Scarlettson",
        })
        expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({
          email: "scarlett@email.com",
          password: "1234",
          firstName: "Scarlett",
          lastName: "Scarlettson",
        })
        let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})