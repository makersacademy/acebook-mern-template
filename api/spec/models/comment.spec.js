var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a content", () => {
    var comment = new Comment({ content: "some content", user_id: 1, post_id: 12 });
    expect(comment.content).toEqual("some content");
  });
  
  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it("can save a comment", (done) => {
    const mockPostId = new mongoose.Types.ObjectId();
    const mockUserId = new mongoose.Types.ObjectId();
    var comment = new Comment({ content: "some content", user_id: mockUserId, post_id: mockPostId });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();

        expect(comments[0]).toMatchObject({ content: "some content"});
        console.log('this message');
        done();
      });
    });
  });
});
