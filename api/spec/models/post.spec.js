
let mongoose = require("mongoose");


require("../mongodb_helper");
let Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    let post = new Post({ user_id: "1", message: "some message", created_at: { type: Date, default: Date.now } });
    expect(post.user_id).toEqual("1");
    expect(post.message).toEqual("some message");
    expect(post.created_at).toBeInstanceOf(Date);
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
