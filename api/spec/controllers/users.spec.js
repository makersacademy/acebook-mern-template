const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email, password and username are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", username: 'person1'})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", username: 'person1'})
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

  describe("GET, when path with user ID", () => {
    test("gets user info if user is authenticated", async () => {
      await request(app)
      // post a new user
        .post("/users")
        .send({email: "jo@email.com", password: "1234", username: 'person2'})
      // get the id of the user
      let users = await User.find()
      let id = users[users.length - 1]._id
      // get the user info
      let response = await request(app)
        .get(`/users/${id}`)
      let user = response.body
      // expect the user info to be returned
      console.log(user)
      expect(response.statusCode).toBe(200)
      expect(user).not.toEqual(undefined)
      expect(user.email).toEqual("jo@email.com")
      expect(user.username).toEqual("person2")


    })


    // test("a user is created", async () => {
    //   await request(app)
    //     .post("/users")
    //     .send({email: "scarlett@email.com", password: "1234", username: 'person1'})
    //   let users = await User.find()
    //   let newUser = users[users.length - 1]
    //   expect(newUser.email).toEqual("scarlett@email.com")
    // })
  })
})