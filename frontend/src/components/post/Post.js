import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import avatar from "./avatar.png";
import NewComment from "../newComment/NewComment";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const getComments = async () => {
    if (token) {
      const response = await fetch(
        `/posts/comment?${new URLSearchParams({ postId: post._id })}`,
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
  };

  useEffect(() => {
    getComments();
  }, []);

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
      <div className="flex flex-col">
        <p className="text-lg font-semibold">Comments</p>
        {comments.map((comment) => (
          <Comment comment={comment} id={comment._id} />
        ))}
      </div>
      <NewComment getComments={getComments} postId={post._id} />
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string,
    authorId: PropTypes.string,
    createdAt: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default Post;
