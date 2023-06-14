let mongoose = require("mongoose");

require("../mongodb_helper");
let Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("Comment has correct properties", () => {
    let comment = new Comment({ 
      message: "some comment", 
      time: "2023-06-14T09:50:21.734Z",
      userId: "648988588abefa9e0cc86fff"
    });
    expect(comment.message).toEqual("some comment");
    expect(comment.time).toEqual(new Date ("2023-06-14T09:50:21.734Z"));
    expect(comment.userId).not.toBe(null);
  });

  it("Can save a comment", (done) => {
    let comment = new Comment({ message: "some comment" });

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
