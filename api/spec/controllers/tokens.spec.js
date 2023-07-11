const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

describe("/tokens", () => {
  let user;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("12345678", 10); // hash the password

    user = new User({
      email: "test@test.com",
      password: hashedPassword, // save the hashed password
      username: "test",
    });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when creds are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: user.email, password: "12345678" }); // send plaintext password
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("a token is not returned when creds are invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: user.email, password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error password mismatch");
  });
});
