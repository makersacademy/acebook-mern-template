const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  })
  

  describe("POST, when email, username and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "poppy@email.com", username: "username1234", password: "1234"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({email: "scarlett@email.com", username: "username1234", password: "1234"})
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
});

describe("GET /users/:id when token is present", () => {
  
  beforeEach( async () => {
    await User.deleteMany({});
  })
  
  test("returns correct user when valid ID provided", async () => {
    // create new user
    const user = new User ({
      email: "someone@example.com",
      username: "someusername",
      password: "somepassword"
    });
    await user.save();
    
    let token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
    const userId = user.id
    //make the GET request to users/:id using the user id above
    let getResponse = await request(app)
      .get(`/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({user: user, token: token});
    expect(getResponse.statusCode).toBe(200)
    expect(getResponse.body.username).toEqual(user.username)
  })
  
  // test("returns 401 user when invalid ID provided", async () => {
  //   // create new user
  //   const user1 = new User ({
  //     email: "someone1@example.com",
  //     username: "some1username",
  //     password: "somepassword"
  //   });
  //   await user1.save();
    
  //   let token = JWT.sign({
  //     user_id: user1.id,
  //     // Backdate this token of 5 minutes
  //     iat: Math.floor(Date.now() / 1000) - (5 * 60),
  //     // Set the JWT token to expire in 10 minutes
  //     exp: Math.floor(Date.now() / 1000) + (10 * 60)
  //   }, secret);

  //   const user2 = new User ({
  //     email: "someone2@example.com",
  //     username: "someusername2",
  //     password: "somepassword2"
  //   });
  //   await user2.save();
    
  //   const userId = user2.id
  //   //make the GET request to users/:id using the user id above
  //   let getResponse = await request(app)
  //     .get(`/users/${userId}`)
  //     // .set("Authorization", `Bearer ${token}`)
  //     // .send({user: user2, token: token});
  //   expect(getResponse.statusCode).toBe(401)

  // })
});
