import React, { useState } from "react";
import PropTypes from "prop-types";
import avatar from "../../assets/avatar.png";
import Comments from "../comments/Comments";
import { ReactComponent as CommentBtn } from "../../assets/comment.svg";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const datePadder = (datePartString) => {
    return datePartString < 10 ? `0${datePartString}` : datePartString;
  };

  const formatDate = () => {
    const date = new Date(post.createdAt);
    return `${date.getFullYear()}/${datePadder(
      date.getMonth() + 1
    )}/${datePadder(date.getDate())} ${datePadder(
      date.getHours()
    )}:${datePadder(date.getMinutes())}`;
  };

  return (
    <article
      data-cy="post"
      key={post._id}
      className="flex flex-col rounded-md shadow-md"
    >
      <div className="m-2 flex">
        <img
          src={avatar}
          alt="Avatar"
          className="mx-2 h-10 w-10 rounded-full"
        />
        <div className="">
          <p className="text-lg font-semibold">{post.author.username}</p>
          <p className="text-sm text-gray-500">{formatDate()}</p>
        </div>
      </div>

      <div className="p-2 text-base">{post.message}</div>
      <div>
        <button onClick={toggleComments} type="button">
          <CommentBtn className="mx-auto h-5 w-5" />
        </button>
      </div>
      {showComments && <Comments postId={post._id} />}
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
