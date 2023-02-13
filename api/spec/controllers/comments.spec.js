const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const Comment = require('../../models/comment');
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
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
    const post = new Post({ message: 'I love this website', user_id: user_id });
    await post.save();
    post_id = post._id;
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    Comment.deleteMany({});
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
      Comment.find((err, comments) => {
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
  });

  describe('When a token is not present', () => {
    it('Sends 401 status in response', async () => {
      const response = await request(app)
        .post('/comments')
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      expect(response.status).toEqual(401);
    });
  });
});
