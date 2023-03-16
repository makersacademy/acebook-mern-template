/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import { AdvancedImage } from "@cloudinary/react";
import contextualTime from "../../helpers/contextualTime";

import { ReactComponent as CommentBtn } from "../../assets/comment.svg";
import { ReactComponent as CommentFilledBtn } from "../../assets/comment-filled.svg";
import { ReactComponent as LikeBtn } from "../../assets/like.svg";
import { ReactComponent as FilledLikeBtn } from "../../assets/fillLike.svg";
import CommentList from "../commentList/CommentList";
import NewComment from "../newComment/NewComment";
import ProfilePicture from "../profilePicture/ProfilePicture";
import { CloudinaryContext } from "../../contexts/cloudinaryContext";

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [likes, setLikes] = useState(post.likes);
  const [userId] = useState(jwtDecode(token).userId);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const postId = post._id;
  const cld = useContext(CloudinaryContext);
  const myImage = cld.image(post.image);

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
      className="flex flex-col rounded-lg border border-gray-100 bg-white"
      key={post._id}
      id={post._id}
    >
      <div className="px-6 pt-4">
        <div className="flex items-center gap-4">
          <ProfilePicture
            className="h-10 w-10"
            publicId={post.author.imageId}
          />
          <div>
            <p className="text-lg font-semibold capitalize">
              {post.author.username}
            </p>
            {formatDate()}
          </div>
        </div>
        <div className="my-2 mt-4 overflow-auto text-base">{post.message}</div>
      </div>
      <div className="flex max-h-[45vh] overflow-hidden">
        <AdvancedImage
          data-cy="image"
          className="object-cover"
          cldImg={myImage}
        />
      </div>
      <div className="flex gap-3 px-6 py-2">
        <div className="flex items-center gap-2">
          {checkIsLiked() ? (
            <FilledLikeBtn
              data-cy="filled-like-button"
              type="button"
              onClick={() => likeHandler("delete")}
              className="h-7 w-auto cursor-pointer fill-red-500"
            />
          ) : (
            <LikeBtn
              data-cy="like-button"
              onClick={() => likeHandler("post")}
              type="button"
              className="h-7 w-auto cursor-pointer fill-black"
            />
          )}
          <p
            data-cy="likes-length"
            className="text-sm text-gray-500"
          >{`${likes.length}`}</p>
        </div>
        <div id="comments-btn-container" className="flex items-center">
          <button
            className="flex items-center p-2"
            onClick={toggleComments}
            type="button"
            id="comments-btn"
          >
            {showComments ? (
              <CommentFilledBtn className="h-7 fill-blue-500" />
            ) : (
              <CommentBtn className="h-7" />
            )}
            <p className="pl-3 text-sm text-gray-600" id="comment-count">
              {commentCount}
            </p>
          </button>
        </div>
      </div>
      {showComments && (
        <>
          <hr />
          <div id="comments-container" className="px-6 pb-6">
            <CommentList comments={comments} />
            <hr />
            <NewComment getComments={getComments} postId={postId} />
          </div>
        </>
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
    image: PropTypes.string,
  }).isRequired,
};

export default Post;
