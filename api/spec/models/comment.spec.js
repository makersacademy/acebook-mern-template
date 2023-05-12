
const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a comment", () => {
    const comment = new Comment({
      postId: "645a4b325527a53115f9bfef",
      comment: "hello world"
    });
    expect(comment.comment).toEqual("hello world");
  });

  it("can list all comments for a post", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var comment = new Comment({
        postId: "645a4b325527a53115f9bfef",
        comment: "hello world"
      });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comment) => {
        expect(err).toBeNull();

        expect(comment[0]).toMatchObject({ comment: "hello world" });
        done();
      });
    });
  });
});
