var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");
var Post = require("../../models/post")



describe("Comments model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a post with a comment", () => {
    var post = new Post({ message: "some message" });
    var comment = new Comment({ message: "This is a comment." });
    post.comments.push(comment);
    expect(post.comments[0].message).toEqual("This is a comment.")
  });
});