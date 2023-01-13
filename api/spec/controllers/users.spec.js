const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const TokenGenerator = require('../../models/token_generator');
const JWT = require("jsonwebtoken");

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });


  describe("POST, when email, password and username are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", password: "1234", username: "poppy888"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", password: "1234", username: "Scarlet5"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", username: "skyemovies301"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", username: "skyemovies301"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({password: "1234", username: "skyemovies301"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({password: "1234", username: "skyemovies301"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })

  describe("POST, when username is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye123@test.com", password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user when username is missing", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", password: "skye1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  });

  describe("GET, when id is given it returns user info", () => {
    let user;
    beforeEach( async () => {
      user = new User({email: 'shah@test.com', password: 'shah', username: 'shah8'});
      await user.save();
      token = TokenGenerator.jsonwebtoken(user.id);
    });
  
    test("response code is 201", async () => {
      let response = await request(app)
        .get("/users")
        .set({"User_ID": user.id})
      expect(response.statusCode).toBe(201)
    });
    test("returns user info when id is given", async () => {
      let response = await request(app)
        .get("/users")
        .set({"User_ID": user.id})
      expect(response.body.user.username).toContain("shah8")
    });
  });
})