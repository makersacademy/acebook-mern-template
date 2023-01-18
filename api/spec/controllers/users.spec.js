const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');
const { deleteOne } = require("../../models/user");

describe("/users/signup", () => {

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

describe("GET, when a user detail is provided", () => {

  test("the response code is 200", async () => {
    let response = await request(app)
      .get("/users/63c05196f61d7b5eeab48f20")
    expect(response.statusCode).toBe(200);
  })

  test("the response has an error if the user doesn't exist", async () => {
    let response = await request(app)
      .get("/users/notarealuserid")
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("This user no longer exists");
  })

  test("finds the user and returns it", async () => {
    let response = await request(app)
      .post("/users/signup")
      .send({email: "poppy@email.com", password: "Password!12345678"})
    let users = await User.find()
    let newUser = users[users.length - 1]
    let id = newUser.id
    let userResponse = await request(app)
      .get("/users/" + id)
    expect(userResponse.body.user.email).toBe("poppy@email.com")
  })
})