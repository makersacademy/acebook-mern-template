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

  it("has a timestamp for when created ", () => {
    const post = {
      _id: "1",
      message: "Hello World",
      user: "John",
      createdAt: new Date(),
    };
    const now = new Date();
    // const options = {
    //   hour12: false,
    //   hour: '2-digit',
    //   minute: '2-digit',
    // };
    // const formattedTime = now.toLocaleString('en-US', options);

    expect(post.message).toEqual("Hello World");
    expect(post.createdAt).toEqual(now);
    
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
