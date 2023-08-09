const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require('../../models/comment')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const TokenGenerator = require("../../lib/token_generator");
const mongoose = require("mongoose");



let token;


describe("/posts", () => {
  beforeAll(async () => {
    user = new User({
      email: "test@test.com",
      username: "testusername",
      password: "12345678",
    });
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
  })
  
  describe("PUT, when token is present", () => {
    test("response with a 200, and message updated", async () => {
      const post = new Post({ message: "test  post 1", user: user._id});

      await post.save();
      const updatedMessage = "updated message";
      // Perform the PUT request with the correct headers
      let response = await request(app)
        .put(`/posts/${post.id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: updatedMessage });
      expect(response.status).toEqual(200);
      // Retrieve the updated post from the database and check if the message is updated
      const updatedPost = await Post.findById(post.id);
      expect(updatedPost.message).toEqual("updated message");
    });



    test("response with an auth error if wrong user, and message consequently does not update", async () => {
      const post = new Post({ message: "test post 2", user: user._id });
      await post.save();
      const updatedMessage = "updated message";
      // Perform the PUT request with the correct headers
      // Create a different user and generate a token for them
      const anotherUser = new User({
        email: "another@test.com",
        username: "anotheruser",
        password: "12345678",
      });
      await anotherUser.save();
      const anotherToken = TokenGenerator.jsonwebtoken(anotherUser._id);
      let response = await request(app)
        .put(`/posts/${post.id}`)
        .set("Authorization", `Bearer ${anotherToken}`)
        .send({ message: updatedMessage });
      expect(response.status).toEqual(401);
      const updatedPost = await Post.findById(post.id);
      expect(updatedPost.message).toEqual("test post 2");
    });

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

    test("creates a post linked to the user", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          message: "hello world",
        });
      const post = await Post.findOne();
      // Assert post is linked to user
      expect(post.user).toEqual(user._id);
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
    test("returns every post in the collection", async () => {
      let post1 = new Post({ message: "howdy!" });
      let post2 = new Post({ message: "hola!" });
      await post1.save();
      await post2.save();
      let response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ token: token });
      let messages = response.body.posts.map((post) => post.message);
      expect(messages).toEqual(["howdy!", "hola!"]);
    });

    // test("returns comments as part of post", async () => {
    //   let newUser = new User({
    //     email: "test2@test.com",
    //     username: "testusername2",
    //     password: "123456782",
    //   })

    //   // create a post
    //   let post1 = new Post({ message: "August 8th POST!" });
    //   await post1.save();
    //   // use that posts id to create a comment
    //   // creating comment should update the post to have the comment in comments field
    //   const postId = post1._id
    //   await request(app)
    //   .post("/comments")
    //   .set("Authorization", `Bearer ${token}`)
    //   .send({ comment: "comment should link to August 8th", username: newUser.username, user: newUser.id, post: postId, token: token })
      
      
    //   let response = await request(app)
    //   .get("/posts")
    //   .set("Authorization", `Bearer ${token}`)
    //   .send({ token: token }); 
    //   let postsList = response.body.posts;
    //   console.log("POSTLIST", postsList);
    //   let comments = postsList.map((post) => post.comments);
    //   console.log("COMMENT", comments);
    //   expect(comments[0][0].comment).toEqual("comment should link to August 8th")
    // })

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
  describe("DELETE, when token is present", () => {
		test("delete a post by post's author with 200 response", async () => {
      let post = new Post({ message: "to delete", user: user._id })
      await post.save();
      // Send a request to delete the post
			const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`)
      // Check the response status
      expect(response.status).toEqual(200);
      // Check if the post is deleted from the database
      const deleted_post = await Post.findById(post._id);
      expect(deleted_post).toBe(null);
    });
    test("when post is deleted, associated comments are deleted as well", async () => {
      // Create a post with comments
      const post = new Post({ message: "Post with comments", user: user._id});
      await post.save();
      const userId = mongoose.Types.ObjectId();
      const comment1 = new Comment({ post: post._id, user: userId, comment: "Comment 1" });
      const comment2 = new Comment({ post: post._id, user: userId, comment: "Comment 2" });
      await comment1.save();
      await comment2.save();
 
      // Send a request to delete the post
      const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`);

      // Check the response status
      expect(response.status).toEqual(200);

      // Check if the post and its associated comments are deleted from the database
      const deleted_post = await Post.findById(post._id);
      expect(deleted_post).toBe(null);
      // Check if associated comment1 doesn't exists
      const deleted_comment1 = await Comment.findById(comment1._id);
      expect(deleted_comment1).toBe(null);
      // Check if associated comment2 doesn't exists
      const deleted_comment2 = await Comment.findById(comment2._id);
      expect(deleted_comment2).toBe(null);
      // Check if any associated comments are deleted from the database
      const comments = await Comment.find({ post: post._id });
      expect(comments).toEqual([]);
    });
    test("returns a new token", async () => {
      let post = new Post({ message: "to delete", user: user._id })
      await post.save();
      // Send a request to delete the post
			const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ token: token });
			let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
			let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
			expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });
  describe("DELETE, when token is missing", () => {
    test("other user can't delete post, 403 response", async () => {
			const userId = mongoose.Types.ObjectId();
      let post = new Post({ message: "to delete", user: userId })
      await post.save();
      // Send a request to delete the post
			const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`)
        // Check the response status
			expect(response.status).toEqual(403);
			// Check if the comment is still in the database
			expect(Post.findById(post._id_)).not.toBe(null);
    });
    test("a token is not returned", async () => {
      const userId = mongoose.Types.ObjectId();
      let post = new Post({ message: "to delete", user: userId })
      await post.save();
      // Send a request to delete the post
			const response = await request(app)
        .delete(`/posts/${post._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ token: token });
      expect(response.body.token).toEqual(undefined);
    });
  });
  
  describe ('POST /like', () => {
    it ('should add the users id to the likes array of the post being liked', async () => {
      const users = await User.find({}).limit(1);
      const user = users[0];
      token = JWT.sign({
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - (5 * 60),
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + (10 * 60)
      }, secret);
      const post = new Post({ message: "test  post 1", user: user._id, likes:[]});
      await post.save();
      await request(app)
        .post("/posts/like")
        .set("Authorization", `Bearer ${token}`)
        .send({ post_id: post._id});

      const updatedPost = await Post.findById(post._id);
      expect(updatedPost.likes).toEqual(
        expect.arrayContaining([user._id]),
      );
    })
  })


});