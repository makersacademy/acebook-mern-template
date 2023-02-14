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
    const user = new User({email: "test@test.com", password: "12345678", firstName: "John", lastName: "Brooks" });
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
        .send({ title: "greeting",
          content: "hello world",
          likes: 0,
          comments: [],
          token: token,
        });
      expect(response.status).toEqual(201);
    });
  
    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "greeting",
          content: "hello world",
          likes: 0,
          comments: [],
          token: token,
        });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].content).toEqual("hello world");
    });
  
    test("returns a new token", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "greeting",
          content: "hello world",
          likes: 0,
          comments: [],
          token: token,
        });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });  
  });
  
  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ title: "greeting",
          content: "hello again world",
          likes: 0,
          comments: [],
          token: token,
        });
      expect(response.status).toEqual(401);
    });
  
    test("a post is not created", async () => {
      await request(app)
        .post("/posts")
        .send({ title: "greeting",
        content: "hello again world",
        likes: 0,
        comments: [],
        token: token,
      });
      let posts = await Post.find();
      expect(posts.length).toEqual(0);
    });
  
    test("a token is not returned", async () => {
      let response = await request(app)
        .post("/posts")
        .send({ title: "greeting",
        content: "hello again world",
        likes: 0,
        comments: [],
        token: token,
      });
      expect(response.body.token).toEqual(undefined);
    });
  })

  describe("GET, when token is present", () => {
    test("returns every post in the collection", async () => {
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      let contents = response.body.posts.map((post) => ( post.content ));
      expect(contents).toEqual(["howdy!", "hola!"]);
    })

    test("the response code is 200", async () => {
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.status).toEqual(200);
    })

    test("returns a new token", async () => {
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
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
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.posts).toEqual(undefined);
    })

    test("the response code is 401", async () => {
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.status).toEqual(401);
    })

    test("does not return a new token", async () => {
      let post1 = new Post({content: "howdy!"});
      let post2 = new Post({content: "hola!"});
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts");
      expect(response.body.token).toEqual(undefined);
    })
  })

  describe("DELETE, when token is present", () => {
    test("deletes the post", async () => {

      const post_id = '63ebab0c9a93032525d4c623'
      let post1 = new Post({_id: post_id, content: "howdy!"});
      
      await post1.save();

      let response = await request(app)
        .delete(`/posts/${post_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({message: "OK", token: token});

        expect(response.status).toBe(204);

        let posts = await Post.find();
        expect(posts.length).toEqual(0);
    })

    test("fails to delete post without present token", async () => {
      const post_id = '63ebab0c9a93032525d4c623'
      let post1 = new Post({_id: post_id, content: "howdy!"});
      
      await post1.save();

      let response = await request(app)
        .delete(`/posts/${post_id}`)
        .send({message: "OK", token: token});

        expect(response.status).toBe(401);

        let posts = await Post.find();
        expect(posts.length).toEqual(1);
    })
  })

  describe("UPDATE, when token is present", () => {
    test("fails to update post without token")
  })
});




