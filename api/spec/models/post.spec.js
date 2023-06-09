const mongoose = require("mongoose");

require("../mongodb_helper");
const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has an empty array for comments", () => {
    const post = new Post(
      { 
      message: "some message", 
    }
    );

    expect(post.comments).toBeTruthy();
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    const post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });
  
  it("has a post with a comment", () => {
    const post = new Post({ message: "some message" });
    const comment = { message: "This is a comment." };
    post.comments.push(comment);
    expect(post.comments[0].message).toEqual("This is a comment.")
  });

  it("can save a post with a comment", (done) => {
    const post = new Post({ message: "some message" });
    const comment = { message: "This is a comment." };
    post.comments.push(comment);

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();
        const firstPost = posts[0]
        const firstComment = firstPost.comments[0]

        expect(firstPost.message).toBe('some message')
        expect(firstComment.message).toBe('This is a comment.')
        done();
      });
    });
  });

});
