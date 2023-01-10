var mongoose = require('mongoose');

require('../mongodb_helper');
var Comment = require('../../models/comment');
// Comment needs Post, but this would make it an
// Integration test
// var Post = require("../../models/post");

describe('Comment model', () => {
  beforeEach((done) => {
    // Changed to posts
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it('has a comment', () => {
    var comment = new Comment({ commentText: 'some comment' });
    expect(comment.commentText).toEqual('some comment');
  });

  it('has a username', () => {
    var comment = new Comment({ username: 'Dave57' });
    expect(comment.username).toEqual('Dave57');
  });

  it('can list all comments', (done) => {
    Comment.find((err, comments) => {
      expect(err).toBeNull();
      expect(comments).toEqual([]);
      done();
    });
  });

  it('can save a comment', (done) => {
    var comment = new Comment({ commentText: 'some comment' });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments[0].commentText).toEqual('some comment');
        done();
      });
    });
  });

  it('can save a username and comment', (done) => {
    var comment = new Comment({
      commentText: 'some comment 2',
      username: 'Dave60',
    });

    comment.save((err) => {
      expect(err).toBeNull();

      Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments[0].commentText).toEqual('some comment 2');
        expect(comments[0].username).toEqual('Dave60');
        done();
      });
    });
  });
});
