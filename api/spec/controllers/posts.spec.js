const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/posts", () => {
  beforeAll(async () => {
    user = new User({ email: "test@test.com", password: "12345678" });
    await user.save();

    token = JWT.sign(
      {
        user_id: user._id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  test("POST, when token is present, responds with a 201", async () => {
    let response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hello world", token: token });
    expect(response.status).toEqual(201);
  });

  test("POST, when token is present, creates a new post", async () => {
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hello world", token: token });
    let posts = await Post.find();
    expect(posts.length).toEqual(1);
    expect(posts[0].message).toEqual("hello world");
  });

  test("POST, when token is present, returns a new token", async () => {
    let response = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hello world", token: token });
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  });

  test("POST, when token is missing, responds with a 401", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello again world" });
    expect(response.status).toEqual(401);
  });

  test("POST, when token is missing, a post is not created", async () => {
    await request(app).post("/posts").send({ message: "hello again world" });
    let posts = await Post.find();
    expect(posts.length).toEqual(0);
  });

  test("POST, when token is missing, a token is not returned", async () => {
    let response = await request(app)
      .post("/posts")
      .send({ message: "hello again world" });
    expect(response.body.token).toEqual(undefined);
  });

  test("GET, when token is present, returns every post in the collection in order of most recent first", async () => {
    let post1 = new Post({ message: "howdy!" });
    await post1.save();
    let post2 = new Post({ message: "hola!" });
    await post2.save();
    let response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    let messages = response.body.posts.map((post) => post.message);
    expect(messages).toEqual(["hola!", "howdy!"]);
  });

  test("GET, when token is present, finds a single post by id", async () => {
    let post1 = new Post({ message: "howdy!" });
    await post1.save();
    let response = await request(app)
      .get(`/posts/${post1.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    let body = response.body.post;
    expect(body.message).toEqual("howdy!");
  });

  test("GET, when token is present, the response code is 200", async () => {
    let post1 = new Post({ message: "howdy!" });
    let post2 = new Post({ message: "hola!" });
    await post1.save();
    await post2.save();
    let response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    expect(response.status).toEqual(200);
  });

  test("GET, when token is present, returns a new token", async () => {
    let post1 = new Post({ message: "howdy!" });
    let post2 = new Post({ message: "hola!" });
    await post1.save();
    await post2.save();
    let response = await request(app)
      .get("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ token: token });
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  });

  test("GET, when token is missingreturns no posts", async () => {
    let post1 = new Post({ message: "howdy!" });
    let post2 = new Post({ message: "hola!" });
    await post1.save();
    await post2.save();
    let response = await request(app).get("/posts");
    expect(response.body.posts).toEqual(undefined);
  });

  test("GET, when token is missing the response code is 401", async () => {
    let post1 = new Post({ message: "howdy!" });
    let post2 = new Post({ message: "hola!" });
    await post1.save();
    await post2.save();
    let response = await request(app).get("/posts");
    expect(response.status).toEqual(401);
  });

  test("GET, when token is missingdoes not return a new token", async () => {
    let post1 = new Post({ message: "howdy!" });
    let post2 = new Post({ message: "hola!" });
    await post1.save();
    await post2.save();
    let response = await request(app).get("/posts");
    expect(response.body.token).toEqual(undefined);
  });
});
