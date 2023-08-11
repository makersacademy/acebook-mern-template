var mongoose = require("mongoose");

require("../mongodb_helper");
var Comment = require("../../models/comment");

describe("Comment model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.comments.drop(() => {
      done();
    });
  });

  it("has a message", () => {
    var comment = new Comment({ comment: "some comment" });
        expect(comment.comment).toEqual("some comment");
    });

    it("can list all comments", (done) => {
        Comment.find((err, comments) => {
          expect(err).toBeNull();
          expect(comments).toEqual([]);
          done();
        });
    });

	it("can save a comment", (done) => {
		const user_id = new mongoose.Types.ObjectId();
    const post_id = new mongoose.Types.ObjectId();
    const username = "usernametest";

    	var comment = new Comment({
				comment: "some comment",
				user: user_id,
        post: post_id,
        username: username
       
      });
    
        comment.save((err) => {
					expect(err).toBeNull();

            Comment.find((err, comments) => {
							expect(err).toBeNull();
              
              expect(comments[0]).toMatchObject({ comment: "some comment" });
             done();
            });
        });
    	});
});
