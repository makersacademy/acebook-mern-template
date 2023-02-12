let mongoose = require("mongoose");

require("../mongodb_helper");
let Comment = require("../../models/comment");

describe("Comment model", () => {
	beforeEach((done) => {
		mongoose.connection.collections.comments.drop(() => {
			done();
		});
	});

	it("has a comment", () => {
		let comment = new Comment({ comment: "my first comment" });
		expect(comment.comment).toEqual("my first comment");
	});

	it("can save a comment", (done) => {
		let comment = new Comment({ comment: "testing a comment" });

		comment.save((err) => {
			expect(err).toBeNull();

			Comment.find((err, comments) => {
				expect(err).toBeNull();

				expect(comments[0]).toMatchObject({ comment: "testing a comment" });
				done();
			});
		});
	});

	it("returns the date and time of when a comment is created", () => {
		const createdAt = new Date("2023-02-10T16:53:48.244Z");
		const comment = new Comment({ comment: "testing a comment", createdAt });

		expect(comment).toMatchObject({
			comment: "testing a comment",
			createdAt: new Date("2023-02-10T16:53:48.244Z"),
		});
	});

	it.only("returns the date and time of when a comment is updated", (done) => {
		const comment = new Comment({ comment: "testing a comment" });
		comment.save((err, savedComment) => {
			expect(err).toBeNull();

			Comment.findOne({ _id: savedComment._id }, (err, foundComment) => {
				foundComment.comment = "testing a comment 2";
				foundComment.save(async (err, updatedComment) => {
					if (err) {
						throw err;
					}

					expect(updatedComment.comment).toEqual("testing a comment 2");
					expect(updatedComment.createdAt).not.toBeNull();
					expect(updatedComment.updatedAt).not.toBeNull();
					done();
				});
			});
		});
	});
});
