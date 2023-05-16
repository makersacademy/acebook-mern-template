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

  it("finding a like in a existing post", async() => {
    //to be able to test an object id, we need to create one, that's why we are using mongoose
    var id = mongoose.Types.ObjectId();
    var post = new Post({ message: "some message", authorUserID: "645fd378ceaefce663b8b497", likes: [id] });

    post.save((err) => {
      expect(err).toBeNull();
       Post.find( (err, posts) => {
        expect(err).toBeNull();
        expect(posts[0].likes.length).toEqual(1)
        expect(posts[0].likes[0]).toEqual(id)
      });
    });
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message", authorUserID: "64621248d00f803f8987d21b" });

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
