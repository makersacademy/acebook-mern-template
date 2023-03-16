import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import contextualTime from "../../helpers/contextualTime";
import { ReactComponent as CommentBtn } from "../../assets/comment.svg";
import { ReactComponent as CommentFilledBtn } from "../../assets/comment-filled.svg";

import { ReactComponent as LikeBtn } from "../../assets/like.svg";
import { ReactComponent as FilledLikeBtn } from "../../assets/fillLike.svg";
import CommentList from "../commentList/CommentList";
import NewComment from "../newComment/NewComment";
import ProfilePicture from "../profilePicture/ProfilePicture";

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [likes, setLikes] = useState(post.likes);
  const [userId] = useState(jwtDecode(token).userId);
  const [showComments, setShowComments] = useState(false);
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

  const likeHandler = async (methodArg) => {
    if (token) {
      const response = await fetch("/posts/like", {
        method: methodArg,
        body: JSON.stringify({
          postId: post._id,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        // error
      } else {
        const data = await response.json();
        setLikes(data.updatedPost.likes);
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
      }
    }
  };

  // returns a boolean if the user already liked the post
  const checkIsLiked = () => {
    return likes.includes(userId);
  };

  return (
    <article
      data-cy="post"
      className="flex flex-col rounded-lg p-6 shadow-md"
      key={post._id}
      id={post._id}
    >
      <div className="m-2 flex items-center">
        <ProfilePicture className="h-10 w-10" publicId={post.author.imageId} />
        <div className="">
          <p className="text-lg font-semibold">{post.author.username}</p>
          {formatDate()}
        </div>
      </div>

      <div className="p-2 text-base">{post.message}</div>
      <div className="m-2 flex items-center gap-4">
        {checkIsLiked() ? (
          <FilledLikeBtn
            data-cy="filled-like-button"
            type="button"
            onClick={() => likeHandler("delete")}
            className="h-8 w-auto cursor-pointer fill-red-500"
          />
        ) : (
          <LikeBtn
            data-cy="like-button"
            onClick={() => likeHandler("post")}
            type="button"
            className="h-8 w-auto cursor-pointer fill-black"
          />
        )}
        <p data-cy="likes-length">{`${likes.length}`} Likes</p>
      </div>
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
    _id: PropTypes.string,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    comments: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      username: PropTypes.string,
      imageId: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
