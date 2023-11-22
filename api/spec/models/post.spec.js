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

  it("has a date", () => {
    var post = new Post({ date: { type: Date, default: Date.now }});
    expect(post.date).toBeInstanceOf(Date);
    const currentTime = new Date().getTime();
    expect(post.date.getTime()).toBeGreaterThan(currentTime - 1000); // 1000 milliseconds before
    expect(post.date.getTime()).toBeLessThan(currentTime + 1000); // 1000 milliseconds after
  });

  it("has likes initiating at 0", () => {
    var post = new Post({ });
    expect(post.likes).toBe(0);
  });

  it("has likes", () => {
    var post = new Post({likes: 25 });
    expect(post.likes).toBe(25);
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message", author: '6555fb6dc0a21062095c4a2b' });

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
