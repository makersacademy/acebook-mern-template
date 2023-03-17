import React from "react";
import PropTypes from "prop-types";
import Comment from "../comment/Comment";

const CommentList = ({ comments }) => {
  const emptyComments = () => {
    if (comments.length === 0) {
      return (
        <p className="" data-cy="no-comments">
          No comments yet
        </p>
      );
    }
    return null;
  };
  return (
    <div data-cy="comment-list">
      <div className="my-6 flex flex-col gap-4">
        <p className="text-lg font-semibold">Comments</p>
        {comments.length > 0
          ? comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))
          : emptyComments()}
      </div>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      authorName: PropTypes.string,
      createdAt: PropTypes.string,
      likes: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default CommentList;
