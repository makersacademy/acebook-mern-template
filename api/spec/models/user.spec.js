const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
	beforeEach(async () => {
		await mongoose.connection.collections.users.drop(() => {});
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
		User.find((err, users) => {
			expect(err).toBeNull();
			expect(users).toEqual([]);
			done();
		});
	});

	it("can save a user when both email address and password are valid", (done) => {
		const user = new User({
			email: "someone@example.com",
			password: "password",
		});

		user.save((err) => {
			expect(err).toBeNull();

			User.find((err, users) => {
				expect(err).toBeNull();

				expect(users[0]).toMatchObject({
					email: "someone@example.com",
					password: "password",
				});
				done();
			});
		});
	});

	it("throws an error message when email address is invalid", (done) => {
		const user = new User({
			email: "invalidemail",
			password: "password",
		});

		user.validate(function (err) {
			expect(err.message).toBe(
				"User validation failed: email: Please use a valid email address"
			);
			done();
		});
	});

	it("throws an error message when password does not meet minimum requirement of password length", (done) => {
		const user = new User({
			email: "someone@example.com",
			password: "123",
		});

		user.validate(function (err) {
			expect(err.message).toBe(
				"User validation failed: password: Path `password` (`123`) is shorter than the minimum allowed length (4)."
			);
			done();
		});
	});

	it("can save a new user when password length meets the requirement of minimum length of 4 or more characters", (done) => {
		const user = new User({
			email: "someone@example.com",
			password: "1234",
		});

		user.validate(function (err) {
			expect(err).toBe(null);
			done();
		});
	});

	it("throws an error message when password exceeds the maximum allowed length of 10 characters", (done) => {
		const user = new User({
			email: "someone@example.com",
			password: "123567891011",
		});

		user.validate(function (err) {
			expect(err.message).toBe(
				"User validation failed: password: Path `password` (`123567891011`) is longer than the maximum allowed length (10)."
			);
			done();
		});
	});
});
