const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const Post = require('../../models/post');
const User = require('../../models/user');
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// let token;

describe('/posts', () => {
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
  });
  beforeEach(async () => {
    await User.deleteMany({});

    await Post.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe('GET - users', () => {
    test('returns 401 when token missing', async () => {
      let response = await request(app).get('/account');
      expect(response.status).toEqual(401);
    });

    test('returns 1 post of user when token passed', async () => {
      await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, message: 'hello world' });
      let response = await request(app)
        .get('/account')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);

      let message = response.body.posts.map((post) => post.message);

      expect(message).toEqual(['hello world']);
    });
  });

  test('returns a new token', async () => {
    let post1 = new Post({ user_id: user_id, message: 'howdy!' });
    let post2 = new Post({ user_id: user_id, message: 'hola!' });
    await post1.save();
    await post2.save();
    let response = await request(app)
      .get('/account')
      .set('Authorization', `Bearer ${token}`)
      .send({ token: token });
    let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
    let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
    expect(newPayload.iat > originalPayload.iat).toEqual(true);
  });

  describe('GET, when token is missing', () => {
    test('returns no posts', async () => {
      let post1 = new Post({ user_id: user_id, message: 'howdy!' });
      let post2 = new Post({ user_id: user_id, message: 'hola!' });
      await post1.save();
      await post2.save();
      let response = await request(app).get('/account');
      expect(response.body.posts).toEqual(undefined);
    });

    test('does not return a new token', async () => {
      let post1 = new Post({ user_id: user_id, message: 'howdy!' });
      let post2 = new Post({ user_id: user_id, message: 'hola!' });
      await post1.save();
      await post2.save();
      let response = await request(app).get('/account');
      expect(response.body.token).toEqual(undefined);
    });
  });
});
