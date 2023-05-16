const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')

describe("/users 1", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email, password, first name and last name are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234",  firstName: "Betty",
        lastName: "Rubble"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", firstName: "Scarlett", lastName: "Ohara"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", firstName: "Scarlett", lastName: "Ohara"})
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
        .send({ password: "1234", firstName: "Scarlett", lastName: "Ohara" });
      expect(response.statusCode).toBe(400);
    });
  
    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  
    test("returns a 409 if email already exists in the database", async () => {
      const user = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123",
      };
      const existingUser = new User(user);
      await existingUser.save();
      
      let response = await request(app)
        .post("/users")
        .send(user);
      expect(response.statusCode).toBe(409);
      expect(response.body).toEqual({ message: "Email address already in use" });
    });
    
  });
  })
