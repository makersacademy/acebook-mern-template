const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");

describe("/tokens", () => {
  beforeEach(() => {
    const user = new User({
      email: "test@test.com",
      password: "$2a$04$p1Syk7r81OGoAZv0oY2Nw..sxJdURZ5EPDPxQ54P.OyyzSZcBBwbO",
      name: "test",
    });
    user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("a token is returned when creds are valid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "makers1" });
    expect(response.status).toEqual(201);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.message).toEqual("OK");
  });

  test("a token is not returned when creds are invalid", async () => {
    let response = await request(app)
      .post("/tokens")
      .send({ email: "test@test.com", password: "1234" });
    expect(response.status).toEqual(401);
    expect(response.body.token).toEqual(undefined);
    expect(response.body.message).toEqual("auth error");
  });
});
