const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const Post = require('../../models/post');
const User = require('../../models/user');
const TokenGenerator = require('../../models/token_generator');
const JWT = require('jsonwebtoken');
let token;

describe('/posts', () => {
  beforeAll(async () => {
    const user = new User({
      email: 'test@test.com',
      password: '12345678',
      firstName: 'John',
      lastName: 'Smith',
    });
    await user.save();
    token = TokenGenerator.jsonwebtoken(user.id);
  });

  beforeEach(async () => {
    await Post.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe('POST, when token is present', () => {
    test('responds with a 201', async () => {
      let response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '635fee24ff8189b02bbc8cf6',
          message: 'hello world',
          token: token,
        });
      expect(response.status).toEqual(201);
    });

    test('creates a new post and adds comment', async () => {
      await request(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'hello world', token: token });
      let posts = await Post.find();
      const did = posts[0].id;
      await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: did,
          message: 'hello world',
          token: token,
        });
      let posts2 = await Post.find();
      expect(posts2[0].comments[0].text).toEqual('hello world');
    });

    test('returns a new token', async () => {
      let response = await request(app)
        .post('/comments')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: '635fee24ff8189b02bbc8cf6',
          message: 'hello world',
          token: token,
        });
      let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
      let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
      expect(newPayload.iat > originalPayload.iat).toEqual(true);
    });
  });

  describe('POST, when token is missing', () => {
    test('responds with a 401', async () => {
      let response = await request(app).post('/comments').send({
        id: '635fee24ff8189b02bbc8cf6',
        message: 'hello world',
      });
      expect(response.status).toEqual(401);
    });
  });

  test('a token is not returned', async () => {
    let response = await request(app).post('/comments').send({
      id: '635fee24ff8189b02bbc8cf6',
      message: 'hello world',
    });
    expect(response.body.token).toEqual(undefined);
  });
});
//   describe('GET, when token is present', () => {
//     test('returns every post in the collection', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get('/posts')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ token: token });
//       let messages = response.body.posts.map((post) => post.message);
//       expect(messages).toEqual(['howdy!', 'hola!']);
//     });

//     test('the response code is 200', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get('/posts')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ token: token });
//       expect(response.status).toEqual(200);
//     });

//     test('returns a new token', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app)
//         .get('/posts')
//         .set('Authorization', `Bearer ${token}`)
//         .send({ token: token });
//       let newPayload = JWT.decode(response.body.token, process.env.JWT_SECRET);
//       let originalPayload = JWT.decode(token, process.env.JWT_SECRET);
//       expect(newPayload.iat > originalPayload.iat).toEqual(true);
//     });
//   });

//   describe('GET, when token is missing', () => {
//     test('returns no posts', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app).get('/posts');
//       expect(response.body.posts).toEqual(undefined);
//     });

//     test('the response code is 401', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app).get('/posts');
//       expect(response.status).toEqual(401);
//     });

//     test('does not return a new token', async () => {
//       let post1 = new Post({ message: 'howdy!' });
//       let post2 = new Post({ message: 'hola!' });
//       await post1.save();
//       await post2.save();
//       let response = await request(app).get('/posts');
//       expect(response.body.token).toEqual(undefined);
//     });
