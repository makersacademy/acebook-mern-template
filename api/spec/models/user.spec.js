const mongoose = require("mongoose");
const User = require("../../models/user");

jest.mock("../../models/user", () => {
  return jest.fn().mockImplementation((user) => {
    return {
      email: user.email,
      password: user.password,
      save: jest.fn().mockImplementationOnce((callback) => callback(null)),
      toObject: () => ({ ...user }),
    };
  });
});

User.find = jest.fn().mockImplementationOnce((callback) => callback(null, []));

describe("User model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    const findSpy = jest.spyOn(User, "find");
    findSpy.mockImplementationOnce((callback) => callback(null, []));

    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });

    User.find = jest
      .fn()
      .mockImplementationOnce((callback) => callback(null, [user]));

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        const userObject = users[0].toObject();

        expect(userObject).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
});
