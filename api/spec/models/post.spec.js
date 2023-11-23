const mongoose = require("mongoose");
require("../mongodb_helper");
const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has content", () => {
    const post = new Post({ content: "some message" });
    expect(post.content).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const user = new User({
      email: "test@gmail.com",
      password: "password",
      username: "TestUser",
      followers: [],
      photograph: "",
      posts: [],
      comments: []
    });

    const created = new Date()
    const post = new Post({ 
      content: "some message",
      created: created,
      author: user._id,
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ content: "some message" });
        done();

      });
    });
  });

});









