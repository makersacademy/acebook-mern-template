const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const { deleteOne } = require("../../models/user");

describe("/users/signup", () => {
  // beforeEach( async () => {
  //   await User.deleteMany({});
  // });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users/signup")
        .send({email: "poppy@email.com", password: "Password!12345678"})
      expect(response.statusCode).toBe(201);
      await User.deleteOne({email: 'poppy@email.com'});
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users/signup")
        .send({email: "scarlett@email.com", password: "Password!12345678"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com");
      await User.deleteOne({email: 'scarlett@email.com'});
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users/signup")
        .send({email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users/signup")
        .send({email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users/signup")
        .send({password: "Password!12345678"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users/signup")
        .send({password: "Password!12345678"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})

//Logging in

describe("/users/login", () => {
  beforeEach( async () => {
    await request(app)
      .post("/users/signup")
      .send({email: "test@test.com", password: "Password!12345678"})
  });

  afterEach( async () => {
    await User.deleteOne({email: 'test@test.com'});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users/login")
        .send({email: "test@test.com", password: "Password!12345678"})
      expect(response.statusCode).toBe(200)
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users/login")
        .send({email: "test@test.com"})
      expect(response.statusCode).toBe(400)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users/login")
        .send({password: "Password!12345678"})
      expect(response.statusCode).toBe(400)
    });
  })
})