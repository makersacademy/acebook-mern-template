var mongoose = require('mongoose');
const Comment = require('../../models/comment');


require('../mongodb_helper');
var Post = require('../../models/post');

describe('Post model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
      done();
    });
  });

  it('has a message', () => {
    var post = new Post({ message: 'some message' });
    expect(post.message).toEqual('some message');
  });

  it('can list all posts', (done) => {
    Post.find((err, posts) => {
      expect(err).toBeNull();
      expect(posts).toEqual([]);
      done();
    });
  });

  it('can save a post', (done) => {
    var post = new Post({ message: 'some message' });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message' });
        done();
      });
    });
  });

  it('can add a post comment ', (done) => {
    var post = new Post({ message: 'some message', comments: 'Some comment' });
    expect(post.message).toEqual('some message');
    expect(post.comments).toEqual('Some comment');
    done();
  });

  it('can add a post comment ', (done) => {
    var comment = new Comment({
      commentText: 'some comment 2',
      username: 'Dave60',
    });
    var post = new Post({ message: 'some message', comments: comment });
    expect(post.message).toEqual('some message');
    expect(post.commentText).toBe();
    done();
  });

});
