const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
// jest.setTimeout(10000); // Set the timeout to 10 seconds

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({
          username: "Poppy",
          email: "poppy@email.com",
          password: "1234",
          avatar: "public/images/avatars/1.svg",
        });
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({
          username: "Scarlett",
          email: "scarlett@email.com",
          password: "1234",
          avatar: "public/images/avatars/1.svg",
        });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual("scarlett@email.com");
    });

    test("a user without avatar is created, default avatar added", async () => {
      await request(app)
        .post("/users")
        .send({ username: "Scarlett", email: "scarlett@email.com", password: "1234" });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.avatar).toEqual("0.svg");
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "user", email: "skye@email.com" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ username: "user", email: "skye@email.com" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "user", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when username is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com", password: "1234" });
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com", password: "1234" });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST avatar change", () => {
    test("the response code is 201 when avatar not posted", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "Poppy", email: "poppy@email.com", password: "1234" });
      expect(response.statusCode).toBe(201);
    });

    test("the response code is 201 when avatr posted", async () => {
      let response = await request(app)
        .post("/users")
        .send({ username: "Poppy", email: "poppy@email.com", password: "1234", avatar: "2.svg" });
      expect(response.statusCode).toBe(201);
    });

    test("the response code is 201 when new avatar chosen", async () => {
      await request(app)
        .post("/users")
        .send({ username: "Poppy", email: "poppy@email.com", password: "1234" });

      let response = await request(app)
        .post("/users/avatar")
        .send({ user_email: "poppy@email.com", filename: "4.svg" });
      expect(response.statusCode).toBe(201);
    });

    test("when new avatar chosen it changes in database", async () => {
      await request(app)
        .post("/users")
        .send({username: "test", email: "test@email.com", password: "1234"})

      let response = await request(app)
        .post("/users/avatar")
        .send({user_email: "test@email.com", filename: "4.svg"})

      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.avatar).toEqual("4.svg")
    })

    test("no avatar chosen code 400", async () => {
      let response = await request(app)
        .post("/users/avatar")
        .send()
      expect(response.statusCode).toBe(400)
    });
  });
  describe("GET /users", () => {
    it('the response code is 200 when user emails are retrieved from the database', async () => {
    let response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    });
  });
});
