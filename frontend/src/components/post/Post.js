import React, { useState } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import { ReactComponent as LikeBtn } from "../../assets/like.svg";
import { ReactComponent as FilledLikeBtn } from "../../assets/fillLike.svg";
import ProfilePicture from "../profilePicture/ProfilePicture";

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [likes, setLikes] = useState(post.likes);
  const [userId] = useState(jwtDecode(token).userId);

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
    <article data-cy="post" className="flex flex-col rounded-lg p-6 shadow-md">
      <div className="m-2 flex">
        <ProfilePicture className="h-10 w-10" publicId={post.author.imageId} />
        <div className="">
          <p className="text-lg font-semibold">{post.author.username}</p>
          <p className="text-sm text-gray-500">{formatDate()}</p>
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
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    author: PropTypes.shape({
      username: PropTypes.string,
      imageId: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
