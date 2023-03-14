import React from "react";
import PropTypes from "prop-types";
import Comment from "../comment/Comment";

const CommentList = ({ comments }) => {
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Comments</p>
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
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
