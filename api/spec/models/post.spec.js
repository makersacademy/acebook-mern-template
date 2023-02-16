let mongoose = require("mongoose");

require("../mongodb_helper");
let Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    let post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

    it("has a single comment i comments", () => {
      let user_id = "1"
      let content = "A comment"
    let post = new Post({ message: "some message", comments:[{user_id, content}]});
    expect(post.comments[0].content).toEqual(content);
  });

  it("has multiple comments", () => {
    let user_id = "1"
    let content = "A comment"
    let post = new Post({ message: "some message", comments:[{user_id, content},{user_id, content}]});
    expect(post.comments[0].content).toEqual(content);
  });

  it("can list all posts", (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it("can save a post", (done) => {
    let post = new Post({ message: "some message" });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: "some message" });
        done();
      });
    });
  });

  it("returns the date and time of when a Post was created", async () => {
    let post = new Post({ message: "some message"});
    expect(post.createdAt).not.toBeNull()
  });

  it("returns the date and time of when a Post is updated", (done) => {
    const post = new Post({ message: "testing a comment",comments:[] });
    post.save((err, post) => {
      expect(err).toBeNull();
      Post.findOne({ _id: post._id }, (err, foundPost) => {
        foundPost.comments.push({content:"testing a comment 2"})
        foundPost.save( (err, updatedPost) => {
          if (err) {
            throw err;
          }
          expect(updatedPost.comments[0].content).toEqual("testing a comment 2");
          done();
        });
      });
    });
  });
});
