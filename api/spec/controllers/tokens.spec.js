const request = require("supertest");
const bcrypt = require("bcryptjs");
const app = require("../../app");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/tokens", () => {
  beforeAll(async () => {
    const user = await new User({
      name: "testy mctestface",
      username: "test",
      email: "test@test.com",
      password: bcrypt.hashSync("12345678", bcrypt.genSaltSync()),
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when creds are valid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "12345678" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("Login Successful");
  });

  test("a token is not returned when creds are invalid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("Incorrect password");
  });

  test("a token is not returned when creds are invalid", async () => {
    const response = await request(app)
      .post("/tokens")
      .send({ email: "test1@test.com", password: "12345678" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("No account with this email");
  });
});
