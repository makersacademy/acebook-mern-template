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
});
