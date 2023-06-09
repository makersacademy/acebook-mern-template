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

  it("can save multiple posts", async () => {
    var post1 = new Post({ message: "this is a post" });
    var post2 = new Post({ message: "this is another post" });

    await post1.save();
    await post2.save();

    let posts = await Post.find();
    expect(posts.length).toBe(2);
  })

  it("can find a single post once multiple posts are added", async () => {
    var post1 = new Post({ message: "this is a post" });
    var post2 = new Post({ message: "this is another post" });

    await post1.save();
    await post2.save();

    let post = await Post.findById(post1._id);
    expect(post).toMatchObject({ message: "this is a post" });
  })

  it("can update a post based on post object id", async () => {
    var post = new Post({ message: "This text will change" });
    const newMessage = "This is the new text";

    await post.save();

    await Post.findByIdAndUpdate(post._id, { message: newMessage });
    let result = await Post.findById(post._id);
    expect(result).toMatchObject({ message: "This is the new text" });
  })
});
