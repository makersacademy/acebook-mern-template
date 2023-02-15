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

	it("returns the date and time of when a comment is created", async () => {
		const comment = await Comment.create({comment: "testing a comment"})
		expect(comment.createdAt).not.toBeNull()
		expect(comment.comment).toEqual("testing a comment")
	});

	it("returns the date and time of when a comment is updated", (done) => {
		const comment = new Comment({ comment: "testing a comment" });
		comment.save((err, savedComment) => {
			expect(err).toBeNull();
			Comment.findOne({ _id: savedComment._id }, (err, foundComment) => {
				foundComment.comment = "testing a comment 2";
				foundComment.save( (err, updatedComment) => {
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

	it("can list all comments on a particular post_id", async() => {
		const comment1 = await Comment.create({comment: "comment1",user_id:"4",post_id:"2"})
		const comment2 = await Comment.create({comment: "comment2",user_id:"5",post_id:"2"})
		const comment3 = await Comment.create({comment: "comment3",user_id:"6",post_id:"1"})
		const comment4 = await Comment.create({comment: "comment4",user_id:"8",post_id:"1"})
		const comment5 = await Comment.create({comment: "comment5",user_id:"2",post_id:"1"})
		let postid_1Comments = await Comment.find({post_id:"1"})
		let postid_2Comments = await Comment.find({post_id:"2"})

		expect(postid_1Comments.length).toEqual(3)
		expect(postid_2Comments.length).toEqual(2)
	});
	it("can get the user_id information from the comment model", async() => {
		const comment1 = await Comment.create({comment: "comment1",user_id:"1",post_id:"2"})
		// Note didn't know how to name the below, it would be called by this but Murat and Thuy wanted to
		// test the user_id property. I think it would be used in React in order to pull in the user ID info into a
		// specific comment block.
		let postid_2CommentsfromUser_id2 = await Comment.find({user_id:"1"})
		expect(postid_2CommentsfromUser_id2[0]).toHaveProperty("user_id","1")
	});
});
