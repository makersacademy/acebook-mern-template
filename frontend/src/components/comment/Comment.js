import React from "react";
import PropTypes from "prop-types";
import avatar from "../../assets/avatar.png";

const Comment = ({ comment }) => {
  const datePadder = (datePartString) => {
    return datePartString < 10 ? `0${datePartString}` : datePartString;
  };

  const formatDate = () => {
    const date = new Date(comment.createdAt);
    return `${date.getFullYear()}/${datePadder(
      date.getMonth() + 1
    )}/${datePadder(date.getDate())} ${datePadder(
      date.getHours()
    )}:${datePadder(date.getMinutes())}`;
  };

  return (
    <div data-cy="comment" className="m-4 flex flex-col shadow-sm">
      <div className="m-2 flex">
        <img
          src={avatar}
          alt="Avatar"
          className="mx-2 h-10 w-10 rounded-full"
        />
        <div className="">
          <p className="text-lg font-semibold">{comment.authorName}</p>
          <p className="text-sm text-gray-500">{formatDate()}</p>
        </div>
      </div>
      <div className="mx-2 p-2 text-base">{comment.message}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    createdAt: PropTypes.string,
    authorName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
