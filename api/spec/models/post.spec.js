var mongoose = require('mongoose');
const Comment = require('../../models/comment');
const User = require('../../models/user.js')

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

  it('adds a time and date to a post', () => {
    var post = new Post({
      message: 'some message',
      createdAt: '2014-12-23T03:15:56.257Z',
    });
    var date = new Date('2014-12-23T03:15:56.257Z');
    expect(post.message).toEqual('some message');
    expect(post.createdAt).toEqual(date);
  });

  it('can save a post', (done) => {
    var post = new Post({ message: 'some message' });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0].message).toEqual('some message');
        done();
      });
    });
  });

  it('can add a post comment ', (done) => {
    var post = new Post({
      message: 'some message',
      comments: { text: 'Some comment' },
    });
    expect(post.message).toEqual('some message');
    expect(post.comments[0].text).toEqual('Some comment');
    done();
  });

  it('can save a post with comment', (done) => {
    var post = new Post({
      message: 'some message 2',
      comments: { text: 'Some comment 2' },
    });

    post.save((err) => {
      expect(err).toBeNull();

      Post.find((err, posts) => {
        expect(err).toBeNull();

        expect(posts[0]).toMatchObject({ message: 'some message 2' });
        expect(posts[0].comments[0]).toMatchObject({
          text: 'Some comment 2',
        });
        done();
      });
    });
  });

  it('can save a post and add comment later', (done) => {
    var post = new Post({
      message: 'some new message',
      // comments: { text: 'Some comment 2' },
    });
    let obId = post.id;
    // console.log(post.id);
    // console.log(post);
    post.save((err) => {
      let post_id = post.id;
      Post.findByIdAndUpdate(
        post_id,
        { $push: { comments: { text: 'New comment!' } } },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated Post : ', docs);
          }
        }
      );
      expect(err).toBeNull();
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: 'some new message' });
        // console.log(posts[0].comments[0]);
        expect(posts[0].comments[0]).toMatchObject({
          text: 'New comment!',
        });
        done();
      });
    });
  });

  xit('can save a post and add 2 comments', (done) => {
    var post = new Post({
      message: 'some new message',
      // comments: { text: 'Some comment 2' },
    });
    let obId = post.id;
    // console.log(post.id);
    // console.log(post);
    post.save((err) => {
      let post_id = post.id;
      Post.findByIdAndUpdate(
        post_id,
        { $push: { comments: { text: 'New comment!' } } },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated Post : ', docs);
          }
        }
      );
      Post.findByIdAndUpdate(
        post_id,
        { $push: { comments: { text: 'Hi everyone!' } } },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated Post : ', docs);
          }
        }
      );
      expect(err).toBeNull();
      Post.find((err, posts) => {
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: 'some new message' });
        // console.log(posts[0].comments[0]);
        expect(posts[0].comments[0].text).toEqual('New comment!');
        expect(posts[0].comments[1].text).toEqual('Hi everyone!');
        done();
      });
    });
  });

    it('has a message', () => {
    var post = new Post({ message: 'some message' });
    expect(post.message).toEqual('some message');
  });

  it('populates the likes array with users', (done) => {
    var post = new Post({ message: 'test message' });
    var user = new User({ email: 'test@test.com', password: 'testpassword', firstName: 'test', lastName: 'trial'});
    let post_id = post.id;
    console.log(user);
    // console.log(post.id);
    post.save((err) => {
 
      Post.findByIdAndUpdate(
        post_id,
        { $push: { likes: {userObj : user.id} } },
        { new: true },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log('Updated Post : ', docs);
          }
        }
      );
      expect(err).toBeNull();
      Post.find((err, posts) => {
        // console.log(posts[0].likes[0])
        expect(err).toBeNull();
        expect(posts[0]).toMatchObject({ message: 'test message' });
        console.log(posts[0].likes[0]);
        // expect(posts[0].likes[0].id).toEqual(user._id);
        expect(posts[0].likes[0].userObj.toString()).toEqual(user.id);
        done();
      });
  });
});
});
