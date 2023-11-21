var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var comment = new Comment({ message: "great post!" });
    expect(comment.message).toEqual("great post!");
  });

  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var comment = new Comment({ message: "great post!"})

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "great post!"})
        done();
      });
    });
  });
  // Adding a test to make sure a comment has the default likes of 0, and has data stored in the date/time
  it("can save a comment with default likes and createdAt", (done) => {
    const comment = new Comment({ message: "great post!" });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0].likes).toEqual(0);
        expect(comments[0].createdAt).not.toBeNull();
        done();
      });
    });
  });

});
