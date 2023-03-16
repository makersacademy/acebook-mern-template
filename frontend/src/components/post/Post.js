import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import contextualTime from "../../helpers/contextualTime";
import { ReactComponent as CommentBtn } from "../../assets/comment.svg";
import { ReactComponent as CommentFilledBtn } from "../../assets/comment-filled.svg";
import avatar from "../../assets/avatar.png";
import CommentList from "../commentList/CommentList";
import NewComment from "../newComment/NewComment";

const Post = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comments, setComments] = useState(post.comments);
  const postId = post._id;

  // useCallback memoizes the function so that it is only called when the dependencies change. Preventing unnecessary re-renders
  const getComments = useCallback(async () => {
    if (token) {
      const response = await fetch(
        `/posts/comment?${new URLSearchParams({ postId })}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(response);
        // Render Modal with generic error message
      } else {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setComments(data.postComments);
      }
    }
  }, [token, postId]);

  // useMemo memoizes the value so that it is only calculated when the dependencies change. Preventing unnecessary re-renders
  const commentCount = useMemo(() => {
    if (comments.length >= 10) {
      return "10+";
    }
    return comments.length;
  }, [comments]);

  const toggleComments = () => {
    setShowComments(!showComments);
    getComments();
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
      id={post._id}
    >
      <div className="m-2 flex items-center">
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
      <div id="comments-btn-container" className="flex items-center">
        <button
          className="flex items-center p-2"
          onClick={toggleComments}
          type="button"
          id="comments-btn"
        >
          {showComments ? (
            <CommentFilledBtn className="mx-auto h-5 w-5 fill-blue-500 stroke-blue-500" />
          ) : (
            <CommentBtn className="mx-auto h-5 w-5" />
          )}
          <p className="px-2 text-sm text-gray-600" id="comment-count">
            {commentCount}
          </p>
        </button>
      </div>
      {showComments && (
        <div id="comments-container">
          <CommentList comments={comments} />
          <NewComment getComments={getComments} postId={postId} />
        </div>
      )}
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
