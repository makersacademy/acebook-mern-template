const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const secret = process.env.JWT_SECRET;

let token;

describe('/comments', () => {
  beforeAll(async () => {
    const user = new User({ email: 'test@test.com', password: '12345678' });
    await user.save();
    user_id = user._id;
    token = JWT.sign(
      {
        user_id: user.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
    const user2 = new User({ email: 'test2@test.com', password: '12345678' });
    await user2.save();
    user_id2 = user2._id;
    token2 = JWT.sign(
      {
        user_id: user2.id,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});
    const post = new Post({ message: 'I love this website', user_id: user_id });
    await post.save();
    post_id = post._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Comment.deleteMany({});
    await Post.deleteMany({});
  });

  describe('POST, when token is present', () => {
    it('responds with 201', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      expect(response.status).toEqual(201);
    });

    it('Uses body information to create comment in database', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      await Comment.find((err, comments) => {
        expect(err).toBeNull();
        const comment = comments[0];
        expect(comment).toMatchObject({
          user_id: user_id,
          post_id: post_id,
          message: 'hello world',
        });
      });
    });

    it('Returns a new token in response', async () => {
      const response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      const newPayload = JWT.decode(
        response.body.token,
        process.env.JWT_SECRET
      );
      const originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });

    it('Adds the id of the comment to the corresponding post document', async () => {
      await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      await Comment.find(async (err, comments) => {
        expect(err).toBeNull();
        const comment_id = comments[0]._id;
        await Post.find((err, posts) => {
          expect(err).toBeNull();
          const updatedPost = posts[0];
          expect([...updatedPost.comments]).toEqual([comment_id]);
        });
      });
    });
  });

  describe('POST without a token', () => {
    it('Sends 401 status in response', async () => {
      const response = await request(app)
        .post('/comments')
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      expect(response.status).toEqual(401);
    });

    it('Should not create a comment in the database', async () => {
      const response = await request(app)
        .post('/comments')
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      await Comment.find((err, comments) => {
        expect(err).toBeNull();
        expect(comments.length).toBe(0);
      });
    });

    it('Should not return a token', async () => {
      const response = await request(app)
        .post('/comments')
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      expect(response.body.token).toBe(undefined);
    });
  });

  describe('Liking comments', () => {
    it('should return an empty array when comment has no likes', async () => {
      let post = new Post({
        user_id: user_id,
        comments: [],
        message: 'posting howdy!',
      });

      await post.save();

      let addingComment = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user_id,
          post_id: post._id,
          message: 'commenting howdy!',
        });

      let response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${token}`);

      let likeCount = 0;
      console.log('response.body: ', response.body.posts[1].comments[0].likes);
      response.body.posts[1].comments.forEach(
        (comment) => (likeCount += comment.likes.length)
      );
      expect(likeCount).toEqual(0);
    });

    it('should have 1 like when the same user likes a comment twice', async () => {
      let post = new Post({
        user_id: user_id,
        comments: [],
        message: 'posting howdy!',
      });

      await post.save();

      let addingComment = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: user_id,
          post_id: post._id,
          message: 'commenting howdy!',
        });

      let fetchingCommentForId = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${token}`);

      let likingComment = await request(app)
        .patch('/comments/like')
        .set('Authorization', `Bearer ${token}`)
        .send({
          _user_id: user_id,
          _id: fetchingCommentForId.body.posts[1].comments[0]._id,
        });

      let secondlikingComment = await request(app)
        .patch('/comments/like')
        .set('Authorization', `Bearer ${token}`)
        .send({
          _user_id: user_id,
          _id: fetchingCommentForId.body.posts[1].comments[0]._id,
        });

      let response = await request(app)
        .get('/posts')
        .set('Authorization', `Bearer ${token}`);

      let likeCount = 0;

      response.body.posts[1].comments.forEach(
        (comment) => (likeCount += comment.likes.length)
      );

      expect(likeCount).toEqual(1);
    });
  });
  it('should have 1 like when comment is liked once', async () => {
    let post = new Post({
      user_id: user_id,
      comments: [],
      message: 'posting howdy!',
    });

    await post.save();

    let addingComment = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: user_id,
        post_id: post._id,
        message: 'commenting howdy!',
      });

    let fetchingCommentForId = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likingComment = await request(app)
      .patch('/comments/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        _user_id: user_id,
        _id: fetchingCommentForId.body.posts[1].comments[0]._id,
      });

    let response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likeCount = 0;

    response.body.posts[1].comments.forEach(
      (comment) => (likeCount += comment.likes.length)
    );

    expect(likeCount).toEqual(1);
  });
  it('should return 0 likes when a user likes then unlikes a comment', async () => {
    let post = new Post({
      user_id: user_id,
      comments: [],
      message: 'posting howdy!',
    });

    await post.save();

    let addingComment = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: user_id,
        post_id: post._id,
        message: 'commenting howdy!',
      });

    let fetchingCommentForId = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likingComment = await request(app)
      .patch('/comments/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        _user_id: user_id,
        _id: fetchingCommentForId.body.posts[1].comments[0]._id,
      });

      let response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likeCount = 0;

    response.body.posts[1].comments.forEach(
      (comment) => (likeCount += comment.likes.length)
    );
    expect(likeCount).toEqual(1);

    let unlikingComment = await request(app)
      .patch('/comments/unlike')
      .set('Authorization', `Bearer ${token}`)
      .send({
        _user_id: user_id,
        _id: fetchingCommentForId.body.posts[1].comments[0]._id,
      });

      let response2 = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

      let likeCount2 = 0;
      response2.body.posts[1].comments.forEach(
      (comment) => (likeCount2 += comment.likes.length));
      expect(likeCount2).toEqual(0);
  });
  it('should let 2 different user like a post', async () => {
    let post = new Post({
      user_id: user_id,
      comments: [],
      message: 'posting howdy!',
    });

    await post.save();

    let addingComment = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        user_id: user_id,
        post_id: post._id,
        message: 'commenting howdy!',
      });

    let fetchingCommentForId = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likingComment = await request(app)
      .patch('/comments/like')
      .set('Authorization', `Bearer ${token}`)
      .send({
        _user_id: user_id,
        _id: fetchingCommentForId.body.posts[1].comments[0]._id,
      });

      let likingComment2 = await request(app)
      .patch('/comments/like')
      .set('Authorization', `Bearer ${token2}`)
      .send({
        _user_id: user_id2,
        _id: fetchingCommentForId.body.posts[1].comments[0]._id,
      });

      let response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`);

    let likeCount = 0;

    response.body.posts[1].comments.forEach(
      (comment) => (likeCount += comment.likes.length)
    );

    expect(likeCount).toEqual(2);

  });
});


// console.log('comment-id: ', fetchingCommentForId.body.posts[1].comments[0]._id);
// console.log('response.body: ', response.body.posts[1].comments[0].likes);
// console.log('response status: ', response3.status);
