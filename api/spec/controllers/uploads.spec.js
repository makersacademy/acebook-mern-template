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
// const fetchMock = require('jest-fetch-mock');
const FormData = require('form-data')
const { Blob } = require('node:buffer')

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
        // // mock DataForm object
        // const newImage = {filename: 'test-file'};
        // const newPostId = 'test-post-id';
  
        // const imageData = new FormData();
        // imageData.append('file', newImage);
        // imageData.append('post_id', newPostId);
  
        // let response = await request(app)
        //   .post("/posts")
        //   .set("Authorization", `Bearer ${token}`)
        //   .send({ message: "hello world", token: token });
  
        // const postResponse = await request(app)
        //   .post("/upload")
        //   .set("Authorization", `Bearer ${token}`)
        //   .attach("file", imagePath);
  
        // expect(response.status).toEqual(201);
        // expect(postResponse.status).toEqual(200);
      });
  
      test("creates a new post with image", async () => {
        // get image file
        const newTestImage = path.resolve(__dirname, '../../public/images/test.png');


        const postResponse = await request(app)
          .post("/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ message: "hello world", token: token });
        // get post_id as response from /posts
        // const post_id = postResponse.body.post_id;
  
        const uploadResponse = await request(app)
          .post("/upload")
          .set('Content-Type', 'multipart/form-data')
          .attach("file", imageData);
  
        // get filename as response from /upload
        // const filename = uploadResponse.text;
  
        const posts = await Post.find();
  
        // console.log("FILENAME FROM RESPONSE: ", filename);
        console.log("IMAGE_PATH FROM DB: ", posts[0].image_path);
        console.log("POST DB DATA: ", posts[0]);
        console.log("POST ID FROM DB: ", posts[0]._id);
        // console.log("POST ID FROM RESPONSE: ", post_id);
  
        expect(posts.length).toEqual(1);
        // expect(posts[0]._id).toEqual(mongoose.Types.ObjectId(post_id));
        expect(posts[0].message).toEqual("hello world");
        //BUG: image_path null
        expect(posts[0].image_path).toEqual(filename);
  
      });
  
      test("creates a new post with image and recieves filename response", async () => {
        // const postResponse = await request(app)
        //   .post("/upload")
        //   .set("Authorization", `Bearer ${token}`)
        //   .attach("file", imagePath);
  
        // const filename = postResponse.text;
        // let response = await request(app)
        //   .post("/posts")
        //   .set("Authorization", `Bearer ${token}`)
        //   .send({ message: "hello world", token: token });
  
        // // due to real date time added to name of the file, we're testing for
        // // filename with "-" before it so we're sure that custon naming is applied
        // expect(filename.substring(13)).toEqual("-fake-test-image");
      });
    });
  });
  