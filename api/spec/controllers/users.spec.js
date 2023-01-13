const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email, password, first name and last name are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", firstName: "poppy", lastName: "playtime"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", firstName: "scarlett", lastName: "witch"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
      expect(newUser.lastName).toEqual("witch")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", firstName: 'skye', lastName: 'broadbande'})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", firstName: 'skye', lastName: 'broadbande'})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", userName: "some", lastName: "one"})
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
})