import React from "react";
import PropTypes from "prop-types";
import avatar from "./avatar.png";

const Post = ({ post }) => {
  const formatDate = () => {
    const date = new Date(post.createdAt);
    return `${date.getFullYear()}/${date.getMonth() + 1}
      /${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
  };
  return (
    <article
      data-cy="post"
      key={post.id}
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
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
