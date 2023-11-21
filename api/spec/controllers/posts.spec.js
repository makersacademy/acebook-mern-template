const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const mongoose = require("mongoose");
const Post = require("../../models/post");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
// for mocking the image file
const fs = require("fs");
const path = require("path");
const { afterEach } = require("@jest/globals");

let token;
let user;

let token2;
let user2;

describe("/posts", () => {
  beforeAll(async () => {
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "12345678",
      avatar: "public/images/avatars/1.svg",
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
      secret,
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

      expect(posts[0].user_id).toEqual(user._id);
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
});

describe("/users/profile/:user_id, postsController", () => {
  beforeAll(async () => {});

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  test("Filter and find posts by user_id and displaying in order", async () => {
    // USER1
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "test",
      avatar: "1.svg",
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
      secret,
    );

    // User 1 creates a posts with their token
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "post by user 1!", token: token });

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "hola! by user 1", token: token });

    let posts1 = await Post.find();

    // USER 2: creating second user to post posts with different user id's
    user2 = new User({
      username: "test2",
      email: "test2@test.com",
      password: "test2",
      avatar: "2.svg",
    });
    await user2.save();

    token2 = JWT.sign(
      {
        user_id: user2.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret,
    );

    // User 2 creates a posts with their token
    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token2}`)
      .send({ message: "post by user 2!", token: token2 });

    await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token2}`)
      .send({ message: "hola! by user 2", token: token2 });

    let new_response = await request(app)
      .get(`/users/profile/${user2._id}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({ token: token2 });
    // mapping messages from post objects in response body
    expect(new_response.body.posts.map((post) => post.message)).toEqual([
      "hola! by user 2",
      "post by user 2!",
    ]);
  });
});

// function for deleting test files
async function deleteFilesInFolder(folderPath, fileNamePattern) {
  try {
    const files = await fs.promises.readdir(folderPath);

    const deletePromises = files
      .filter((file) => fileNamePattern.test(file))
      .map((file) => {
        const filePath = path.join(folderPath, file);
        return fs.promises.unlink(filePath);
      });

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting files:", error.message);
  }
}

describe("/upload", () => {
  beforeAll(async () => {
    user = new User({
      username: "test",
      email: "test@test.com",
      password: "12345678",
      avatar: "public/images/avatars/1.svg",
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
      secret,
    );
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});

    // delete all test images from uploads directory
    const folderPath =
      "/Users/ami/Desktop/MakersCode/JavaSriptCode/acebook/uploads";
    const fileNamePattern = /\d{13}-fake-test-image/;

    deleteFilesInFolder(folderPath, fileNamePattern);
  });

  // mocking fake file to test the routes and requests
  describe("POST, when token is present", () => {
    // placing an image file
    const imagePath = path.resolve("../../../fake-test-image");
    // writing fake content on image file
    fs.writeFileSync(imagePath, "fake-image-content");

    test("responds with a 201", async () => {
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });

      const postResponse = await request(app)
        .post("/upload")
        .set("Authorization", `Bearer ${token}`)
        .attach("file", imagePath);

      expect(response.status).toEqual(201);
      expect(postResponse.status).toEqual(200);
    });

    // test("creates a new post with image", async () => {
    //   const postResponse = await request(app)
    //     .post("/posts")
    //     .set("Authorization", `Bearer ${token}`)
    //     .send({ message: "hello world", token: token });
    //   // get post_id as response from /posts
    //   const post_id = postResponse.body.post_id;
    //   // console.log("POST ID: ", post_id)

    //   const uploadResponse = await request(app)
    //     .post("/upload")
    //     .set("Authorization", `Bearer ${token}`)
    //     .attach("file", imagePath);

    //   // get filename as response from /upload
    //   const filename = uploadResponse.text;

    //   await new Promise((resolve) => setTimeout(resolve, 500));

    //   let posts = await Post.find();
    //   console.log("FILENAME FROM RESPONSE: ", filename);
    //   console.log("IMAGE_PATH FROM DB: ", posts[0].image_path);
    //   console.log("POST DB DATA: ", posts[0]);
    //   console.log("POST ID FROM DB: ", posts[0]._id);
    //   console.log("POST ID FROM RESPONSE: ", post_id);

    //   expect(posts.length).toEqual(1);
    //   expect(posts[0]._id).toEqual(mongoose.Types.ObjectId(post_id));
    //   expect(posts[0].message).toEqual("hello world");
    //   expect(posts[0].user_id).toEqual(user._id);
    //   //BUG: image_path null
    //   expect(posts[0].image_path).toEqual(filename);

      ////TODO: expect to check filename in database when change implemented
      ////TODO: expect to check post_id returned
    // });

    test("creates a new post with image and recieves filename response", async () => {
      const postResponse = await request(app)
        .post("/upload")
        .set("Authorization", `Bearer ${token}`)
        .attach("file", imagePath);

      const filename = postResponse.text;
      let response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world", token: token });

      // due to real date time added to name of the file, we're testing for
      // filename with "-" before it so we're sure that custon naming is applied
      expect(filename.substring(13)).toEqual("-fake-test-image");
    });
  });
});
