const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/tokens", () => {
  beforeAll(async () => {
    const user = new User({ 
        email: "test@gmail.com",
        password: "password",
        username: "TestUser",
        followers: [],
        photograph: "",
        posts: [],
        comments: []
      });

    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({})
  })
  it("", () => {})


  test("a token is returned when creds are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@gmail.com", password: "password"})
    expect(response.status).toEqual(201)
    expect(response.body.token).not.toEqual(undefined)
    expect(response.body.message).toEqual("OK")
  })


  test("a token is not returned when creds are invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "1234"})
    expect(response.status).toEqual(401)
    expect(response.body.token).toEqual(undefined)
    expect(response.body.message).toEqual("auth error")
  })

})
