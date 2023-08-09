const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;
let logged_in_user_id;
let savedUser;


describe("/posts", () => {
  beforeAll( async () => {
    user = new User({email: "test@test.com", password: "12345678", username: 'person1'});
    savedUser = await user.save();
    logged_in_user_id = savedUser.id

    token = JWT.sign({
      user_id: logged_in_user_id,
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

    test("check post linked to user", async() => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token, user_id: user.id});
        let posts = await Post.find();
        expect(posts[0].user_id).toBe(user.id)
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
    });

    test("user id included in post data", async () => {
      user2 = new User({email: "test2@test.com", password: "12345678", username: "person2"});
      await user2.save();
  
      let post1 = new Post({message: "howdy!", user_id: user.id});
      await post1.save();
      let post2 = new Post({message: "hello!", user_id: user2.id});
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({token: token});
      expect(response.body.posts[0].user_id).toBe(user.id)
      expect(response.body.posts[1].user_id).toBe(user2.id)
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
  describe("PUT, when logged in user is post author", () => {
    test("the response code is 201", async () => {
      let post1 = new Post({message: "howdy!", user_id: logged_in_user_id});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token, message: "I meant to say Hello!"});
      expect(response.status).toEqual(201);
    })
        
    test("the post's message gets updated", async () => {
      let post1 = new Post({message: "howdy!", user_id: logged_in_user_id});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token, message: "I meant to say Hello!"});
      let posts = await Post.find();
      expect(posts[0].message).toEqual("I meant to say Hello!")
      expect(response.body.post.message).toEqual("I meant to say Hello!")
    });

    test("returns a new token", async () => {
      let post1 = new Post({message: "howdy!", user_id: logged_in_user_id});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token, message: "I meant to say Hello!"});
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });

    test("when post doesn't exist response code is 404", async () => {
      const post_id = "4eb6e7e7e9b7f4194e000001";
      let response = await request(app)
        .put(`/posts/${post_id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({token: token, message: "I meant to say Hello!"});
      expect(response.status).toEqual(404)
    })
  });

  describe("PUT, when token is not present", () => {
    test("the response code is 401", async () => {
      let post1 = new Post({message: "howdy!"});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .send({message: "I meant to say Hello!"});
      expect(response.status).toEqual(401)
    })
    test("a token is not returned", async () => {
      let post1 = new Post({message: "howdy!"});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .send({message: "I meant to say Hello!"});
      expect(response.body.token).toEqual(undefined);
    })
    test("when post doesn't exist response code is 404", async () => {
      const post_id = "4eb6e7e7e9b7f4194e000001";
      let response = await request(app)
        .put(`/posts/${post_id}`)
        .send({message: "I meant to say Hello!"});
      expect(response.status).toEqual(401)
    })
    test("the post message doesn't change", async () => {
      let post1 = new Post({message: "howdy!"});
      await post1.save();
      await request(app)
        .put(`/posts/${post1.id}`)
        .send({message: "I meant to say Hello!"});
      let posts = await Post.find();
      expect(posts[0].message).toEqual("howdy!");
    })
  });

  describe("PUT when logged in user is not post author", () => {
    test("the response code is 401", async () => {
      let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001"});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({message: "I meant to say Hello!"});
      expect(response.status).toEqual(401);
    });
    
    test("the post message should not change", async () => {
      let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001"});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({message: "I meant to say Hello!"});
      let posts = await Post.find();
      expect(posts[0].message).toEqual("howdy!");
    });

    test("a token is not returned", async () => {
      let post1 = new Post({message: "howdy!", user_id: "4eb6e7e7e9b7f4194e000001"});
      await post1.save();
      let response = await request(app)
        .put(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({message: "I meant to say Hello!"});
      expect(response.body.token).toEqual(undefined);
    });
    })
  
    describe("POST, can add comments to posts", () => {
    test("when the reponse code is 201", async () => {
      let post1 = new Post({ message: "post message"});
      await post1.save();
      let response = await request(app)
        .post(`/posts/${post1.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({comment: "comment1"});
      expect(response.status).toEqual(201);
      const updatedPost = await Post.find()
      expect(updatedPost[0].comments[0].comment).toEqual("comment1")
    })
    test("should return 404 when the post does not exist", async () => {
    const postId = "4eb6e7e7e9b7f4194e000001"
    const response = await request(app)
      .post(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({token: token, comment: "comment1"});
    expect(response.status).toEqual(404)
    })
  
  })

  });
