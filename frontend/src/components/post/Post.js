import React, { useState } from "react";
import PropTypes from "prop-types";

import Comments from "../comments/Comments";
import contextualTime from "../../helpers/contextualTime";
import { ReactComponent as CommentBtn } from "../../assets/comment.svg";
import { ReactComponent as CommentFilledBtn } from "../../assets/comment-filled.svg";
import avatar from "../../assets/avatar.png";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const commentCount = () => {
    const countComments = post.comments.length;
    if (countComments >= 10) {
      return "10+";
    }
    return countComments;
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formatDate = () => {
    const date = new Date(post.createdAt);
    const formattedDate = contextualTime(date);
    return <p className="text-sm text-gray-500">{formattedDate}</p>;
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
          {formatDate()}
        </div>
      </div>

      <div className="p-2 text-base">{post.message}</div>
      <div id="comments-btn" className="flex items-center">
        <button
          className="flex items-center p-2"
          onClick={toggleComments}
          type="button"
        >
          {showComments ? (
            <CommentFilledBtn className="mx-auto h-5 w-5 fill-blue-500 stroke-blue-500" />
          ) : (
            <CommentBtn className="mx-auto h-5 w-5" />
          )}
          <p className="px-2 text-sm text-gray-600">{commentCount()}</p>
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
