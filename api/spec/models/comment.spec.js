var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require("../../models/comment");
var User = require("../../models/user");


describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    var comment = new Comment({ message: "comment1"});
    expect(comment.message).toEqual("comment1");
  });

  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var post = new Post({ message: "some message" });
    var comment = new Comment({ message: "comment2" });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ message: "comment2" });
        done();
      });
    });
  });
});
