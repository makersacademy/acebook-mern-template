import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes.length || 0);
  const [isLiked, setLiked] = useState(comment.liked);
  const createdAt = new Date(comment.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleLike = async () => {
    let url = "/comments/" + comment._id + "/likes";
    let response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    response.json().then(async (data) => {
      window.localStorage.setItem("token", data.token);
      setLikes(data.likes); //JSON web token response containing updated number of likes (toggleLike method in api Controller/posts)
      setLiked(data.liked); //JSON web token updates 'like' status
    });
  };
  return (
    <article data-cy="comment" key={comment._id} className="post-container">
      <img src={require(`../avatars/avatar-${comment.user.avatar}.jpg`)} width='20' height='20' alt="Default Avatar" />
      <strong>
        {comment.user.name} ({result})
      </strong>
      <p></p>
      <div>{comment.comment} </div>
      <div>
        <button className="likes-container" onClick={toggleLike}>
          {isLiked ? "unlike" : "like"}
        </button>
        {likes} {likes !== 1 ? "likes" : "like"}
      </div>
    </article>
  );
};

export default Comment;
