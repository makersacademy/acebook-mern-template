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
    const user = new User({email: "test@test.com", password: "12345678", username: "username1", name: "User Name"});
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

  describe("POST /addCommentToPost, when token is present", () => {
    test("responds with a 202", async () => {
      // creates a new post
      const post = new Post({message: 'my first post'});
      // saves to DB
      await post.save();
      // sends imitation HTTP request with post_id inserted into body 
      let response = await request(app)
        .post('/posts/add-comment')
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            comment: {
              message: 'a comment',
            },
            token: token,
          }
        );
      // checks response status
      expect(response.status).toEqual(202);
    });
  
    test("adds a comment to an existing post", async () => {
      // creates a new post
      const post = new Post({message: 'my first post'});
      // saves to DB
      await post.save();
      // sends imitation HTTP request with post_id inserted into body 
      let response = await request(app)
        .post("/posts/add-comment")
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            commentMessage: 'a comment',
            token: token,
          }
        );
      // checks if post has been updated properly by loading it from the database
      let updatedPost = await Post.findById(post._id)
      expect(updatedPost.comments.length).toEqual(1);
      expect(updatedPost.comments[0].message).toEqual('a comment')
      // checks comment has been assigned a uniqe ID by mongoose
      expect(updatedPost.comments[0]._id).toBeTruthy();
    });

    test("returns a new token", async () => {
      // creates a new post
      const post = new Post({message: 'my first post'});
      // saves to DB
      await post.save();
      // sends imitation HTTP request with post_id inserted into body 
      let response = await request(app)
        .post("/posts/add-comment")
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            comment: {
              message: 'a comment',
            },
            token: token,
          }
        );
      // finds for the tokens (somehow)
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      // iat = issued at, this is checking that new payload was issued more recently then the original and thus is newer
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe("POST /addComment, when token is missing", () => {
    test("responds with a 401", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      // no token attached this time
      let response = await request(app)
        .post("/posts/add-comment")
        .send(
          { 
            postId: post._id,
            comment: {
              message: 'a comment',
            },
          }
        );
      // checks for 401
      expect(response.status).toEqual(401)
    });
  
    test("doesn't add a comment to an existing post", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      // no token attached this time
      let response = await request(app)
        .post("/posts/add-comment")
        .send(
          { 
            postId: post._id,
            comment: {
              message: 'a comment',
            },
          }
        );
      // checks that the Post does not have a comment added
      let postFromDatabase = await Post.findById(post._id)
      expect(postFromDatabase.comments.length).toEqual(0);
    });

    test("doesn't return  a new token", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      // no token attached this time
      let response = await request(app)
        .post("/posts/add-comment")
        .send(
          { 
            postId: post._id,
            comment: {
              message: 'a comment',
            },
          }
        );
      // checks that the response doesn't have a token attached
      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("POST /add-like, when token is present", () => {
    test("responds with 201 and like count of 1", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      let response = await request(app)
        .post('/posts/add-like')
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            token: token,
          }
        );

      expect(response.status).toEqual(201);
      expect(response.body.likeCount).toEqual(1);
    });

    test("responds with like count 0 when sending request twice", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      await request(app)
        .post('/posts/add-like')
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            token: token,
          }
        );

        let response = await request(app)
        .post('/posts/add-like')
        .set("Authorization", `Bearer ${token}`)
        .send(
          { 
            postId: post._id,
            token: token,
          }
        );

      expect(response.body.likeCount).toEqual(0);
    });
  })

  describe("POST /add-like, when token is missing", () => {
    test("responds with a 401", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      // no token attached this time
      let response = await request(app)
        .post("/posts/add-like")
        .send(
          { postId: post._id }
        );
      // checks for 401
      expect(response.status).toEqual(401)
    });

    test("does not update the likedByUsers array", async () => {
      const post = new Post({message: 'my first post'});
      await post.save();
      // no token attached this time
      let response = await request(app)
        .post("/posts/add-like")
        .send(
          { postId: post._id }
        );
      // checks for 401
      let postFromDatabase = await Post.findById(post._id)
      expect(postFromDatabase.likedByUsers.length).toEqual(0);
    });
  });
});
