const mongoose = require("mongoose");
const Comment = require("../../models/comment");
require("../mongodb_helper");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  // Test case: "has a username"
  it("has a username", () => {
    const comment = new Comment({ username: "john_doe" });
    expect(comment.username).toEqual("john_doe");
  });

  // Test case: "has a postId"
  it("has a postId", () => {
    const postId = new mongoose.Types.ObjectId();
    const comment = new Comment({ postId });
    expect(comment.postId).toEqual(postId);
  });

  // Test case: "has a time"
  it("has a time", () => {
    const comment = new Comment({ time: "2023-07-10 12:00:00" });
    expect(comment.time).toEqual("2023-07-10 12:00:00");
  });

  // Test case: "has a comment"
  it("has a comment", () => {
    const comment = new Comment({ comment: "This is a comment" });
    expect(comment.comment).toEqual("This is a comment");
  });

  // Test case: "can save a comment"
  it("can save a comment", (done) => {
    const commentData = {
      username: "john_doe",
      postId: new mongoose.Types.ObjectId(),
      time: "2023-07-10 12:00:00",
      comment: "This is a test comment",
    };

    const comment = new Comment(commentData);

    const saveSpy = jest.spyOn(comment, "save");
    saveSpy.mockImplementationOnce((callback) => callback(null));

    const findSpy = jest.spyOn(Comment, "find");
    findSpy.mockImplementationOnce((callback) =>
      callback(null, [comment])
    );

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments.length).toEqual(1);

        const savedComment = comments[0];
        expect(savedComment.toObject()).toMatchObject(commentData);

        done();
      });
    });
  });
});
