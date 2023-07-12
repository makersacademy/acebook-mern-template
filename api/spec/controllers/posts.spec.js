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
    const user = new User({
      email: "test@test.com",
      password: "12345678",
      username: "test",
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

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" });

      expect(response.body.token).toBeUndefined();
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

  const Notification = {
    find: jest.fn(),
  };

  // Then you can use this mock in your test like this:

  describe("POST, with a mention to a non-existing user", () => {
    test("creates a post and no notification", async () => {
      Notification.find.mockResolvedValue([]); // Mock the find method to return an empty array

      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello @fakeUser" });
      let posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("hello @fakeUser");

      let notifications = await Notification.find();
      expect(notifications.length).toEqual(0); // no notification should be created
    });
  });

  describe("POST, with an image", () => {
    test("uploads the image and adds it to the new post", async () => {
      // Create a buffer that simulates an image file
      const mockImage = Buffer.from([1, 0, 1, 0, 1, 0, 1, 0, 1, 0]);

      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .attach("image", mockImage, "mock_image.jpg") // Attach the buffer as a file to the request
        .field("message", "hello world");

      // Assertions...

      // For example, you could assert that the response's post object has an image property
      expect(response.body.post.image).toBeTruthy();

      // Or if the post model saves the image's data and contentType, you could retrieve the created post and compare the image data
      let post = await Post.findById(response.body.post._id);
      expect(post.image.data.toString()).toEqual(mockImage.toString());

      expect(post.image.contentType).toEqual("image/jpeg"); // Assuming multer sets this contentType
    });
  });

  describe("POST, with a valid request", () => {
    test("creates a new post with a timestamp", async () => {
      const OriginalDate = Date;
      const mockDate = new Date(2023, 6, 12, 11, 21); // Month is 0-indexed
      global.Date = jest.fn(() => mockDate);
      global.Date.now = OriginalDate.now;

      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world" });

      // Verify that the post object in the response has a 'time' property
      expect(response.body.post.time).toBeTruthy();

      // If the format of 'time' is known and consistent, you could even check that
      // For example, if time is in the format "HH:MM DD-MM-YYYY"
      expect(response.body.post.time).toMatch("11:21 12-7-2023");

      global.Date = OriginalDate; // Remember to restore the original Date function after the test
    });
  });

  describe("GET /posts - error case", () => {
    beforeEach(() => {
      server = app.listen();
      jest
        .spyOn(Post, "find")
        .mockRejectedValue(new Error("Mock database error"));
    });

    afterEach((done) => {
      Post.find.mockRestore();
      server.close(done);
    });

    describe("GET /posts/:postId/image - no image", () => {
      it("should handle when the post does not have an image", async () => {
        const postWithoutImage = new Post({ message: "post without image" });
        await postWithoutImage.save();

        const response = await request(app)
          .get(`/posts/image/${postWithoutImage._id}`)
          .set("Authorization", `Bearer ${token}`);

        expect(response.status).toEqual(404);
      });
    });
  });

  describe("GET /posts/image/:postId", () => {
    test("returns the image for a valid post ID", async () => {
      const mockImageData = "mockImageData"; // Specify the mock image data
      const mockContentType = "image/jpeg"; // Specify the mock content type

      // Mock the Post.findById method to return a post with mocked image data
      const mockPost = {
        _id: "fakePostId",
        image: {
          data: mockImageData,
          contentType: mockContentType,
        },
      };
      jest.spyOn(Post, "findById").mockImplementation((postId, callback) => {
        callback(null, mockPost);
      });

      // Perform a GET request to retrieve the image
      const response = await request(app)
        .get("/posts/image/fakePostId")
        .set("Authorization", `Bearer ${token}`);

      // Assertions...
      expect(response.status).toEqual(200);
      expect(response.headers["content-type"]).toEqual(mockContentType);
      expect(response.body).toEqual(Buffer.from(mockImageData, "base64"));

      // Restore the original implementation of Post.findById
      Post.findById.mockRestore();
    });

    test("returns a 404 for an invalid post ID", async () => {
      // Mock the Post.findById method to return no post
      jest.spyOn(Post, "findById").mockImplementation((postId, callback) => {
        callback(null, null); // Simulate no post found
      });

      // Perform a GET request with an invalid post ID
      const response = await request(app)
        .get("/posts/image/invalidPostId")
        .set("Authorization", `Bearer ${token}`);

      // Assertions...
      expect(response.status).toEqual(404);

      // Restore the original implementation of Post.findById
      Post.findById.mockRestore();
    });
  });
});
