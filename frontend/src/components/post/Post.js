import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import "./Post.css";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes.length || 0);
  const [isLiked, setLiked] = useState(post.liked);
  const createdAt = new Date(post.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleLike = async () => {
    let url = "/posts/" + post._id + "/likes";
    let response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    response.json().then(async (data) => {
      window.localStorage.setItem("token", data.token);
      setLikes(data.likes);
      setLiked(data.liked);
    });
  };
  return (
    <article data-cy="post" key={post._id} className="post-container">
      <strong><a href={"/user/" + post.user._id}>{post.user.name}</a> ({result}):</strong> 
      <p></p>
      <div>{post.message} </div>

      <div><button className="likes-container" onClick={toggleLike}>{isLiked ? "unlike" : "like"}</button>
       Likes: {likes}</div>
      
    </article>
  );
};

export default Post;
