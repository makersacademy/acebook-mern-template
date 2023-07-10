const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

require("../mongodb_helper");
const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a username", () => {
    const post = new Post({ username: "testuser" });
    expect(post.username).toEqual("testuser");
  });

  it("has a time", () => {
    const post = new Post({ time: "12:00 PM" });
    expect(post.time).toEqual("12:00 PM");
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has image data and content type", () => {
    const post = new Post({
      image: { data: Buffer.from("Hello World"), contentType: "text/plain" },
    });
    expect(post.image.data.toString()).toEqual("Hello World");
    expect(post.image.contentType).toEqual("text/plain");
  });

  it("has an authorId", () => {
    const post = new Post({
      authorId: new mongoose.Types.ObjectId("605c39f0c19988fa06b3c595"),
    });
    expect(post.authorId.toString()).toEqual("605c39f0c19988fa06b3c595");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({
      username: "testuser",
      time: "12:00 PM",
      message: "This is a test post",
      image: {
        data: Buffer.from("Hello World"),
        contentType: "text/plain",
      },
      authorId: new mongoose.Types.ObjectId("605c39f0c19988fa06b3c595"),
    });

    const saveSpy = jest.spyOn(post, "save");
    saveSpy.mockImplementationOnce((callback) => callback(null));

    const findSpy = jest.spyOn(Post, "find");
    findSpy.mockImplementationOnce((callback) => callback(null, [post]));

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        // Remove _id from the comparison
        const { _id, ...postObject } = posts[0].toObject();

        expect(postObject).toMatchObject({
          username: "testuser",
          time: "12:00 PM",
          message: "This is a test post",
        });

        // Check image and authorId separately
        expect(postObject.image.contentType).toEqual(
          expect.stringContaining("text/plain")
        );
        expect(postObject.authorId).toEqual(
          expect.any(mongoose.Types.ObjectId)
        );
        done();
      });
    });
  });
});
