const Comment = require('../../models/comment');
const mongoose = require('mongoose');
require('../mongodb_helper');

describe('Testing comments model', () => {
  beforeEach((done) => {
    debugger;
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it('has a message property', () => {
    const comment = new Comment({ message: 'great post you have here' });
    expect(comment.message).toEqual('great post you have here');
  });

  it('has a user_id property', () => {
    user_id = new mongoose.Types.ObjectId();
    const comment = new Comment({ user_id: user_id });
    expect(comment.user_id).toEqual(user_id);
  });

  it('has a post_id property', () => {
    post_id = new mongoose.Types.ObjectId();
    const comment = new Comment({ post_id: post_id });
    expect(comment.post_id).toEqual(post_id);
  });
});
