var mongoose = require("mongoose");
const { ObjectId } = require('mongoose').Types;

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });
  afterAll(async () => {
    await Post.deleteMany({});
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
  // Adding a test to make sure a post has data stored in the date/time
  it("can save a post with createdAt", (done) => {
    const post = new Post({ message: "some message" });
    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        // expect(posts[0].likes).toEqual(0);
        expect(posts[0].createdAt).not.toBeNull();
        done();
      });
    });
  });
  // Adding a test to make sure a post saves with an empty array for likes
  it("can save a post with an empty likes array", async () => {
    const post = new Post({ message: "some message", likes: [] });
  
    await post.save();
  
    const posts = await Post.find();
  
    expect(posts[0].likes).toHaveLength(0);
  });
  // Adding a test to make sure a post saves with an array of one user_id to simulate one like
  it("can add a user ID to the likes array", async () => {
    const post = new Post({ message: "some message" });
  
    // Create an ObjectId and push it into the likes array
    const userId = ObjectId();
    post.likes.push(userId);
  
    await post.save();
  
    const posts = await Post.find();
  
    // Check if the likes array contains the user ID
    expect(posts[0].likes).toContainEqual(userId);
    // Check that the array of likes is only 1
    expect(posts[0].likes).toHaveLength(1);
  });
  test("can save post with default image path: null", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "some message",
          image_path: null,
        });
        done();
      });
    });
  });
});
