var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
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

  it("can save a post with userid", (done) => {
    var post = new Post({ message: "some message", posterUserId: "12345" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "some message",
          posterUserId: "12345",
        });
        done();
      });
    });
  });

  it("can save a post with comments array", (done) => {
    var post = new Post({
      message: "some message",
      comments: [
        {
          time: 8888888888,
          user: "135235234h234bv34v",
          comment: "comments are overrated",
        },
        {
          time: 8888889999,
          user: "135235234h234bv34v",
          comment: "sorry about my previous comment ",
        },
      ],
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({
          message: "some message",
          comments: [
            {
              time: 8888888888,
              user: "135235234h234bv34v",
              comment: "comments are overrated",
            },
            {
              time: 8888889999,
              user: "135235234h234bv34v",
              comment: "sorry about my previous comment ",
            },
          ],
        });
        done();
      });
    });
  });
});
