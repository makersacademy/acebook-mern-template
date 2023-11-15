const mongoose = require("mongoose");

require("../mongodb_helper");
const Comment = require("../../models/comment");
const User = require("../../models/user");
const Post = require("../../models/post");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
        done();
    });
  });

  it("Comment attrs match", () => {
    const created = new Date();

    const user = new User({
      email: "test@gmail.com",
      password: "password",
      username: "TestUser",
      followers: [],
      photograph: "",
      posts: [],
      comments: [],
    });

    const comment = new Comment({
      author: user._id,
      content: "testContent",
      created: created,
      post_id: "testPostId",
    });

    expect(comment.content).toEqual("testContent");
    expect(comment.created).toEqual(created);
    expect(comment.content).toEqual("testContent");
  });

  it("can list all comments", (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

    it("can save comment", (done) => {
      const user = new User({
        email: "test@gmail.com",
        password: "password",
        username: "TestUser",
        followers: [],
        photograph: "",
        posts: [],
        comments: [],
      });
      const created = new Date();

      const post = new Post({
        content: "test",
        created: created,
        likes: 0,
        author: user._id,
      })
      const comment = new Comment({
        author: user._id,
        content: "testContent",
        created: created,
        post_id: post._id,
      });

      comment.save((err) => {
        expect(err).toBeNull;
        console.log("AAAAAABBBBBBBSDHJDBGHDHSBDHBSDHDBHSAQJUHQHJWJDHBHW");
        Comment.find((err, comments) => {
        console.log(err)
          expect(err).toBeNull();
          console.log(comments)
          expect(comments[0].content).toEqual("testContent");
          done();
        });
      });
    });

});
