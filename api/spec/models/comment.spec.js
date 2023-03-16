const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const comment = new Comment({ message: "some message" });
    expect(comment.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Comment.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });
});
