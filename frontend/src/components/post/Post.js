import React, { useState } from "react";


const Post = ({ post, setPosts, posts, token }) => {


  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

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
    <button data-cy="delete" onClick={() => handleDeletePost(post._id)}>Delete</button>
        <div className="likes">
       <p className="left-aligned">{post.message}</p>
       <p className="likes-text">Likes: {likes}</p>
       <div className="likeButton"><button onClick={handleLike}>Like</button></div>
      </div>

    </>
  );
};

export default Post;

