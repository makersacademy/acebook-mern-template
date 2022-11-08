const app = require('../../app');
const request = require('supertest');
require('../mongodb_helper');
const User = require('../../models/user');

describe('/users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST, when email, username & password are provided', () => {
    test('the response code is 201', async () => {
      let response = await request(app).post('/users').send({
        email: 'poppy@email.com',
        password: '1234AAppLLLll',
        usersName: 'Kyle Cook',
      });
      expect(response.statusCode).toBe(201);
    });

    test('a user is created', async () => {
      await request(app).post('/users').send({
        email: 'scarlett@email.com',
        password: '1234AAppLLLll',
        usersName: 'Kyle Cook',
      });
      let users = await User.find();
      let newUser = users[users.length - 1];
      expect(newUser.email).toEqual('scarlett@email.com');
    });
  });

  describe('POST, when password is missing', () => {
    test('response code is 400', async () => {
      let response = await request(app)
        .post('/users')
        .send({ email: 'skye@email.com' });
      expect(response.statusCode).toBe(400);
    });

    test('does not create a user', async () => {
      await request(app).post('/users').send({ email: 'skye@email.com' });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });


  describe('POST, when email is missing', () => {
    test('response code is 400', async () => {
      let response = await request(app)
        .post('/users')
        .send({ password: '1234AAppLLLll' });
      expect(response.statusCode).toBe(400);
    });

    test('does not create a user', async () => {
      await request(app).post('/users').send({ password: '1234AAppLLLll' });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe('POST, when username is missing', () => {
    test('response code is 400', async () => {
      let response = await request(app)
        .post('/users')
        .send({ usersName: 'Kyle Cook' });
      expect(response.statusCode).toBe(400);
    });

    test('does not create a username', async () => {
      await request(app).post('/users').send({ usersName: 'Kyle Cook' });
      let users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe('POST, when email is invalid format', () => {
    test('the response code is 201', async () => {
      let response = await request(app).post('/users').send({
        email: 'poppy@email<>.com',
        password: '1234AAppLLLll',
        usersName: 'Kyle Cook',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST, when password is invalid format', () => {
    test('the response code is 201', async () => {
      let response = await request(app).post('/users').send({
        email: 'poppy@email.com',
        password: '<<>>//////>>',
        usersName: 'Kyle Cook',
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST, when username is invalid format', () => {
    test('the response code is 201', async () => {
      let response = await request(app).post('/users').send({
        email: 'poppy@email.com',
        password: '12345JJJJ',
        usersName: 'Kyle<>?||--- Cook',
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
