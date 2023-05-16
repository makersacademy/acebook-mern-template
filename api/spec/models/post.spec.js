var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    var post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("sets default values for like and likedBy", () => {
    var post = new Post({ message: "some message" });
    expect(post.like).toEqual(0);
    expect(post.likedBy).toEqual(expect.arrayContaining([]));
  });

  it("has a like field with 5 likes", () => {
    var post = new Post({ message: "some message", like: 5 });
    expect(post.like).toEqual(5);
  });
  
  it("has a likedBy field with two users", () => {
    var post = new Post({ message: "some message", likedBy: ["user1", "user2"] });
    expect(post.likedBy).toEqual(expect.arrayContaining(["user1", "user2"]));
  });
  
  it("can save a comment to a post with user id and name", async () => {
    const post = new Post({ message: "some message" });
  
    await post.save();
  
    const foundPost = await Post.findById(post._id);
    foundPost.comments.push({ comment: "some comment", author: { id: "user1", name: "Donald Chump" } });
    await foundPost.save();
  
    const updatedPost = await Post.findById(post._id);
  
    expect(updatedPost.comments[0]).toMatchObject({ comment: "some comment", author: { id: "user1", name: "Donald Chump" } });
  });  
});
