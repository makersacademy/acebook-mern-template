const mongoose = require('mongoose');

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
      usersName: 'Ben Smith',
    });
    expect(user.email).toEqual('someone@example.com');
  });

  it('has an name', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
      usersName: 'Ben Smith',
    });
    expect(user.usersName).toEqual('Ben Smith');
  });

  it('has a password', () => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
      usersName: 'Ben Smith',
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
      usersName: 'Ben Smith',
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: 'someone@example.com',
          password: 'password',
          usersName: 'Ben Smith',
        });
        done();
      });
    });
  });

  // it("", () => {
  //   const user = new User({
  //     email: "someone@example.com",
  //     password: "password",
  //     usersName: 12
  //   });
  //   expect(user.usersName).toEqual(1234);
  // });
});

describe('user model', () => {
  // Needs to be in a different describe, else it will break other tests as the db.drop can't find anything to delete.
  it("won't save the user if email is incorrect format", (done) => {
    const user = new User({
      email: 'someone@>example.com',
      password: 'password',
      usersName: 'Ben Smith',
    });

    user.save((err) => {
      User.find((users) => {
        expect(err).not.toBeNull();
        expect(users).toBeNull();
        done();
      });
    });
  });

  it("won't save the user if password is incorrect format", (done) => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password<>',
      usersName: 'Ben Smith',
    });

    user.save((err) => {
      User.find((users) => {
        expect(err).not.toBeNull();
        expect(users).toBeNull();
        done();
      });
    });
  });

  it("won't save the user if usersName is incorrect format", (done) => {
    const user = new User({
      email: 'someone@example.com',
      password: 'password',
      usersName: 'Ben[] Smith',
    });

    user.save((err) => {
      User.find((users) => {
        expect(err).not.toBeNull();
        expect(users).toBeNull();
        done();
      });
    });
  });
});
