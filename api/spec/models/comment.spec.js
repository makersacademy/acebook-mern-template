let mongoose = require("mongoose");

require("../mongodb_helper");
let Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("comment has correct properties", () => {
    let comment = new Comment({ 
      message: "some comment", 
      time: "2023-06-08T14:05:10.525+00:00" 
    });
    expect(comment.message).toEqual("some message");
    expect(comment.time).toEqual(new Date ("2023-06-08T14:05:10.525Z"));
    expect(comment.likes.toObject()).toEqual([]);
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
