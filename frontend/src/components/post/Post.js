import React from "react";


const Post = ({ post, setPosts, posts, token }) => {
  const handleDeletePost = async (id) => {
    await fetch(`/posts/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    });
  };

  return (
    <>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <article data-cy="post-userName" key={ 'userName' }>{ post.userName }</article>
      <article data-cy="post-comments" key={ 'comments' }>{ post.comments}</article>
      <button onClick={() => handleDeletePost(post._id)}>Delete</button>
    </>
  );
};

export default Post;
