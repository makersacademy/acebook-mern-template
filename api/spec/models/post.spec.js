var mongoose = require('mongoose');

require('../mongodb_helper');
jest.mock()

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

  it('post has a timestamp', () => {
    const currentDate = new Date('2022-05-14T11:01:58.135Z');
    var post = new Post({ timestamp: currentDate });
    expect(post.timestamp).toEqual(currentDate);
  });

  // it('post can include an image', () => {
  //   const img = jest.mock('../../../assets/images/apples.png');
  //   var post = new Post({ image: img });
  //   expect(post.image).toEqual(img);
  // });
});
