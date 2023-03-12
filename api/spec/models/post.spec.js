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

  test('should be an array', () => {
    let post = new Post({ message: "some message", likes: [] });
    expect(Array.isArray(post.likes)).toBe(true);
  });

  it("should have an empty array to store likes", () => {
    let post = new Post({ message: "some message", likes: [] });
    expect(Array.isArray(post.likes)).toBe(true);
  })

  it("can add a new like to a post", (done) => {
    const user = { _id: '1234567890abcdef12345678' };
    let post = new Post({ message: "some message", likes: [] });
    post.likes.push(user._id);
    expect(post.likes.length).toEqual(1);
    done();
  })
});
