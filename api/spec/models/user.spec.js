const mongoose = require('mongoose');
const fs = require('fs');
require('../mongodb_helper');
const User = require('../../models/user');

describe('User model', () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it('has an email address', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
    });
    expect(user.email).toEqual('someone@example.com');
  });

  it('has a password', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
    });
    expect(user.password).toEqual('password');
  });

  it('can list all users', (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it('can save a user', (done) => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: 'someone@example.com',
          password: 'password',
        });
        done();
      });
    });
  });

  it('can save a user with an image', (done) => {
    const image = fs.readFileSync(__dirname + '/../test-image.png');
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
      image: image,
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();
        expect(users[0]).toMatchObject({
          email: 'someone@example.com',
          password: 'password',
          image: expect.any(Buffer),
        });
        done();
      });
    });
  });
});
