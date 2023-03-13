import React, { useState } from "react";
import PropTypes from "prop-types";
import avatar from "./avatar.png";

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [likes, setLikes] = useState(post.likes);

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

  const likeHandler = async () => {
    if (token) {
      const response = await fetch("/posts/like", {
        method: "post",
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

  return (
    <article data-cy="post" className="flex flex-col rounded-md shadow-md">
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
      <div className="m-2 flex items-center gap-4">
        <button
          onClick={likeHandler}
          className="border p-2 hover:bg-black hover:text-white"
          type="button"
        >
          Like
        </button>
        <p>{`${likes.length}`} Likes</p>
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
    }),
  }).isRequired,
};

export default Post;
