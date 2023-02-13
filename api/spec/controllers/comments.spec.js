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
  });

  describe('POST, when token is present', () => {
    it('responds with 201', async () => {
      let response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_id: user_id, post_id: post_id, message: 'hello world' });
      expect(response.status).toEqual(201);
    });
  });
});
