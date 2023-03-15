import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ comment }) => {
  // post is the
  const [likes, setLikes] = useState(comment.likes.length || 0);
  const [isLiked, setLiked] = useState(comment.liked);
  const createdAt = new Date(comment.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleLike = async () => {
    let url = " ";
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
    <article data-cy="comment" key={comment._id}>
      Comment from {comment.user.name}: {comment.message} ({result})
      {/*<button onClick={toggleLike}>{isLiked ? "unlike" : "like"}</button>*/}
      Like count: {likes}
    </article>
  );
};

export default Comment;
