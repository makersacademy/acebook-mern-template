var mongoose = require("mongoose");

require("../mongodb_helper");
var Post = require("../../models/post");

describe("Post model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it("has a message, a number of likes, author ID and an array of ID's who liked the post", () => {
    const author_id = new mongoose.Types.ObjectId()
    const likedBy_id = [new mongoose.Types.ObjectId(),new mongoose.Types.ObjectId()]
    const post_data = { 
      message: "some message",
      likes: 3,
      author: author_id,
      likedBy: likedBy_id
    }
    var post = new Post(post_data);
    expect(post.likes).toEqual(3)
    expect(post.message).toEqual("some message");
    expect(post.author).toEqual(author_id);
    expect(post.likedBy[0]).toEqual(likedBy_id[0]);
    expect(post.likedBy[1]).toEqual(likedBy_id[1]);
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
});
