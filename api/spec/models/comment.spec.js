var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ content: "some post" });
    var comment = new Comment({ content: "some comment" });
    expect(post.content).toEqual("some post");
    expect(comment.content).toEqual("some comment");
  });

  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    var post = new Post({ content: "some post" });
    var comment = new Comment({ content: "some comment" });

    
    post.save((err) => {
      expect(err1).toBeNull();
        comment.save((err) => {
          expect(err).toBeNull();
      Comment.find((err, comments) => {
        expect(err).toBeNull();

         expect(comments[0]).toMatchObject({ message: "some comment" });
        done();
      });
    });
  });
  });
});
