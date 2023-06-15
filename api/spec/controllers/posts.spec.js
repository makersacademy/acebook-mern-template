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
        .send({ message: "hello world", token: token });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello world");
    });

    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      await request(app).post("/posts").send({ message: "hello again world" });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("returns every post in the collection in reverse order", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      expect(messages).toEqual(["hola!", "howdy!"]);
    });

    test("the response code is 200", async () => {
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

    test("returns a new token", async () => {
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
  });

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.posts).toEqual(undefined);
    });

    test("the response code is 401", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.status).toEqual(401);
    });

    test("does not return a new token", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app).get("/posts");
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("POST to add commment", () => {
    // Test that a comment can be created (incl. token checker)
  })

  describe("PATCH to add a comment to an existing post", () => {
    // Create a new post
    // Test that a comment can be added to post
  })


  // IGNORE leaving for now
  describe("PATCH to add comments", () => {
    // This works, keeping it here to re-use
    // test("creates a new post", done => {
    //   request(app)
    //     .post("/posts")
    //     .set("Authorization", `Bearer ${token}`)
    //     .send({ message: "hello world", token: token })
    //     .then(() => {
    //       return Post.find().then(posts => {
    //         expect(posts.length).toEqual(1);
    //         expect(posts[0].message).toEqual("hello world");
    //         done();
    //       });
    //     });
    // });

    xtest("Posts have a comments array", (done) => {
      request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "i am post", token: token })
        .then(() => {
          return Post.find().then((posts) => {
            expect(posts[0].comments).toEqual([]);
            done();
          });
        })
        .catch((error) => {
          done(error); // Pass the error to the `done` callback
        });
    });
  });

  // xtest("A post has one comment", done => {
  //   let comment = new Post({ message: "I am comment!" });

  //   request(app)
  //     .post("/posts")
  //     .set("Authorization", `Bearer ${token}`)
  //     .send({ message: "i am post", comments: [comment], token: token })

  //     .then(() => {
  //       return Post.find().then(posts => {
  //         expect(posts[0].comments[0].message).toEqual("I am comment!");
  //         done();
  //       });
  //     });
  // });

  describe("PATCH", () => {
    test("updates likes", async () => {
      let post1 = new Post({ message: "howdy!" });
      await post1.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let id = response.body.posts[0]._id;
      response = await request(app)
        .patch("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ postId: id, likes: ["1"] });
      response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      expect(response.body.posts[0]._id).toEqual(id);
      expect(response.body.posts[0].likes).toEqual(["1"]);
    });
  });
});
