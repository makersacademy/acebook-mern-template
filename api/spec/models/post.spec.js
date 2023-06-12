var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("post has correct properties", () => {
    var post = new Post({ 
      message: "some message", 
      time: "2023-06-08T14:05:10.525+00:00" 
    });
    expect(post.message).toEqual("some message");
    expect(post.time).toEqual(new Date ("2023-06-08T14:05:10.525Z"));
    expect(post.likes.toObject()).toEqual([]);
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
});
