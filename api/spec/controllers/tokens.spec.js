const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user');

describe("/tokens", () => {
  beforeAll( () => {
    const user = new User({ email: "test@test.com", password: "Password!12345678" })
    user.save()
  });

  afterAll( async () => {
    await User.deleteMany({})
  })

  test("a token is returned when creds are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "Password!12345678"})
      console.log(response.body)
    expect(response.status).toEqual(201)
    expect(response.body.token).not.toEqual(undefined)
    expect(response.body.message).toEqual("OK")
  })


  test("a token is not returned when creds are invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({email: "test@test.com", password: "nottherightpassword"})
    expect(response.status).toEqual(401)
    expect(response.body.token).toEqual(undefined)
    expect(response.body.message).toEqual("auth error")
  })
})