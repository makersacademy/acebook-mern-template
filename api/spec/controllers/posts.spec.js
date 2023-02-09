const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/posts", () => {
  beforeAll(async () => {
    const user = new User({ email: "test@test.com", password: "12345678" });
    await user.save();
    user_id = user._id;
    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
    const user2 = new User({ email: "user2@test.com", password: "12345678" });
    await user2.save();
    user2_id = user2._id;
    token2 = JWT.sign(
      {
        user_id: user2.id,
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

  describe("POST, when token is present", () => {
    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: user_id, message: "hello world", token: token });

      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: user_id, message: "hello world", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ user_id: user_id, message: "hello world", token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ user_id: user_id, message: "hello again world" });
      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app)
        .post("/posts")
        .send({ user_id: user_id, message: "hello again world" });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ user_id: user_id, message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      expect(messages).toEqual(["howdy!", "hola!"]);
    });

    test("the response code is 200", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.status).toEqual(200);
    });

    test("returns a new token", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
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
  });

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.posts).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      let post2 = new Post({ user_id: user_id, message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("DELETE posts", () => {
    test("deletes post with valid token", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();

      const p_id = await savedPost._id;

      let response = await request(app)
        .delete("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id });
      expect(response.status).toBe(204);

      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("returns 401 without token", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();
      const p_id = await savedPost._id;

      let response = await request(app).delete("/posts").send({ _id: p_id });
      expect(response.status).toBe(401);
    });
  });

  describe("PUT updates posts", () => {
    it("updates a post", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();

      const p_id = await savedPost._id;

      let response = await request(app)
        .put("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id, message: "hello world" });

      expect(response.status).toBe(204);
      let posts = await Post.find();
      expect(posts[0].message).toBe("hello world");
    });

    it("returns 401 when no token", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();

      const p_id = await savedPost._id;

      let response = await request(app)
        .put("/posts")
        .send({ _id: p_id, message: "hello world" });

      expect(response.status).toBe(401);
    });
  });
  describe("LIKES posts", () => { //need to create one then test it.
    test("When there's no likes on a post it should return an empty array", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      await post1.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      let likes = response.body.posts.map((post) => post.likes);
      expect(messages).toEqual(["howdy!"]);  
      expect(likes).toEqual([]);
    });
    test("without a token it should return 401", async () => {
        let post1 = new Post({ user_id: user_id, message: "howdy!" });
        const savedPost = await post1.save();

        const p_id = await savedPost._id;

        let response = await request(app)
          .patch("/posts")
          .send({ _id: p_id, _user_id: user_id });

        expect(response.status).toBe(401);
      });
    test("a user can like a post", async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();
      const p_id = savedPost._id;

      let response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id, _user_id: user_id });

      expect(response.status).toBe(204);
      let posts = await Post.find();
      expect(posts[0].likes.length).toBe(1);
      });
    test("two different users can like a post", async () => {
      let user1 = new User({ email: "user1@user.com", password: "password1" });
      await user1.save();
  
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();
      const p_id = savedPost._id;
  
      let response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id, _user_id: user_id });
  
      expect(response.status).toBe(204);
      let posts = await Post.find();
      expect(posts[0].likes.length).toBe(1);
  
      let response2 = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token2}`)
        .send({ _id: p_id, _user_id: user2_id });
     
      expect(response2.status).toBe(204);
      let posts2 = await Post.find();
      expect(posts2[0].likes.length).toBe(2);
      console.log(posts2[0].likes)
  })
    test('A user cannot like a post twice', async () => {
      let post1 = new Post({ user_id: user_id, message: "howdy!" });
      const savedPost = await post1.save();
      const p_id = savedPost._id;

      let response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id, _user_id: user_id });

      expect(response.status).toBe(204);
      let posts = await Post.find();
      expect(posts[0].likes.length).toBe(1);

      let response1 = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ _id: p_id, _user_id: user_id });

      expect(response1.status).toBe(204);
      let posts1 = await Post.find();
      expect(posts1[0].likes.length).toBe(1);
    });
  });
});
