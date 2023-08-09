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

  it("has a post user id", () => {
    var post = new Post({ user_id: "64d252785e8bb4153df2c997" });
    expect(post.user_id.toString()).toEqual("64d252785e8bb4153df2c997");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message", user_id: "64d252785e8bb4153df2c997"});

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        postid = posts[0]._id;

        expect(posts[0]).toHaveProperty("message", "some message");
        expect(posts[0]._id).toBeDefined();
        done();
      });
    });
  });

  it("can add a comment", async () => {
    const post = new Post({
      comments: [{ user_id: "1", comment: "new comment" }],
    });

    await post.save();

    const posts = await Post.find();
    expect(posts[0].comments[0].user_id).toEqual("1");
    expect(posts[0].comments[0].comment).toEqual("new comment");
  });

});
