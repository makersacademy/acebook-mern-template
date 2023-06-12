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

  it("can delete a post", (done) => {
    var post = new Post({ message: "delete post" });
  
    post.save((err, savedPost) => {
      expect(err).toBeNull();
  
      Post.findById(savedPost._id, (err, foundPost) => {
        expect(err).toBeNull();
        expect(foundPost).toBeDefined();
  
        foundPost.deleteOne((err) => {
          expect(err).toBeNull();
  
          Post.find((err, posts) => {
            expect(err).toBeNull();
            expect(posts).toEqual([]);
            done();
          });
        });
      });
    });
  });
});
