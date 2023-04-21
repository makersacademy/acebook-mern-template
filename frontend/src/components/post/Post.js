import React, { useState } from "react";

const Post = (props) => {
  const { post, token, setToken } = props;
  const [deletedPost, setDeletedPost] = useState(false);

  const Delete = () => {
    if (token) {
      fetch("/api/posts/", {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { _id: post._id },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setDeletedPost(true);
          console.log("message", "Message has been deleted");
        });
    }
  };

  const displayPost = (deletedPost) => {
    if (deletedPost === false)
      return (
        <article data-cy="post" key={post._id}>
          {post.message}
          <button onClick={Delete}>Delete</button>
        </article>
      );
    else
      return (
        <div>
          <p>This message has been deleted.</p>
        </div>
      );
  };

  return (
    // <article data-cy="post" key={post._id}>
    //   {post.message}
    //   <button onClick={Delete(token, setToken)}>Delete</button>
    // </article>

    displayPost(deletedPost)
  );
};

export default Post;
