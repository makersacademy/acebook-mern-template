const Comment = require('../../models/comment');
const mongoose = require('mongoose');
require('../mongodb_helper');

describe('Testing comments model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it('has a message property', () => {
    const comment = new Comment({ message: 'great post you have here' });
    expect(comment.message).toEqual('great post you have here');
  });

  it('has a user_id property', () => {
    const user_id = new mongoose.Types.ObjectId();
    const comment = new Comment({ user_id: user_id });
    expect(comment.user_id).toEqual(user_id);
  });

  it('has a post_id property', () => {
    const post_id = new mongoose.Types.ObjectId();
    const comment = new Comment({ post_id: post_id });
    expect(comment.post_id).toEqual(post_id);
  });

  it('can have all properties simultaneously', () => {
    const post_id = new mongoose.Types.ObjectId();
    const user_id = new mongoose.Types.ObjectId();
    const comment = new Comment({
      post_id: post_id,
      user_id: user_id,
      message: 'hello world',
    });
    expect(comment.post_id).toEqual(post_id);
    expect(comment.user_id).toEqual(user_id);
    expect(comment.message).toEqual('hello world');
  });

  it('comments can be saved', (done) => {
    const post_id = new mongoose.Types.ObjectId();
    const user_id = new mongoose.Types.ObjectId();
    const comment = new Comment({
      post_id: post_id,
      user_id: user_id,
      message: 'hello world',
    });
    comment.save((err) => {
      expect(err).toBeNull();
      Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments[0]).toMatchObject(comment.toObject());
        expect(comments.length).toBe(1);
        done();
      });
    });
  });
});
