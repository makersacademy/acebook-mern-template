const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;

describe("/posts", () => {  
  beforeAll( async () => {
    const user = new User({email: "test@test.com", password: "12345678"});
    await user.save();

    token = JWT.sign({
      user_id: user.id,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Post.deleteMany({});
  })

  afterAll( async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  })

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
        .send({ message: "hello world", token: token })
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });

  describe("LIKE, when token is present", () => {
    test("responds with a 200 and returns a new token, and the number of likes of post", async () => {
      // We first create a new post to be able to like it
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      // Grab the ID of the post
      let post_id = (await Post.find())[0].id;
      // Use the ID as part of the request going to backend
      let response = await request(app)
        .post("/posts/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post_id, token: token });
      expect(response.status).toEqual(200);
      // Posts default like value is 0, expect the like count to increase by 1
      expect(response.body.likes).toEqual(1)
      // Check if the response sends a new token
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("LIKE, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts/like")
        // post ID does not matter here, as we expect to get stuck at token checks
        .send({ post_id: 1, token: token });
      expect(response.status).toEqual(401);
    });
  });

  describe("UNLIKE, when token is present", () => {
    test("responds with a 200 and returns a new token, and the number of likes of post", async () => {
      // We first create a new post to be able to like it
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });
      // Grab the ID of the post
      let post_id = (await Post.find())[0].id;
      // Use the ID as part of the request going to backend
      let response = await request(app)
        .post("/posts/unlike")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post_id, token: token });
      expect(response.status).toEqual(200);
      // Posts default like value is 0, expect the like count to decrease by 1
      // User would not get to see the unlike feature so -1 would not 
      // happen in a real use case scenario
      expect(response.body.likes).toEqual(-1)
      // Check if the response sends a new token
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("UNLIKE, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts/unlike")
        // post ID does not matter here, as we expect to get stuck at token checks
        .send({ post_id: 1, token: token });
      expect(response.status).toEqual(401);
    });
  });

  describe("LIKE, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts/like")
        // post ID does not matter here, as we expect to get stuck at token checks
        .send({ post_id: 1, token: token });
      expect(response.status).toEqual(401);
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
      await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let messages = response.body.posts.map((post) => ( post.message ));
      expect(messages).toEqual(["howdy!", "hola!"]);
    })

    test("the response code is 200", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    })
  })

  describe("GET, when token is missing", () => {
    test("returns no posts", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.posts).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let post1 = new Post({message: "howdy!"});
      let post2 = new Post({message: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.token).toEqual(undefined);
    })
  })
});
