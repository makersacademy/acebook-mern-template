import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Comment from "../comment/Comment";

const Post = ({ post }) => {
  // post is the
  const [likes, setLikes] = useState(post.likes.length || 0);
  const [isLiked, setLiked] = useState(post.liked);
  const [comments, setComments] = useState(post.comments);
  const createdAt = new Date(post.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleLike = async () => {
    let url = "/posts/" + post._id + "/likes" + "/comments";
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
  console.log(comments);
  return (
    <article data-cy="post" key={post._id}>
      Post from {post.user.name}: {post.message} ({result})
      <button onClick={toggleLike}>{isLiked ? "unlike" : "like"}</button>
      Like count: {likes}
      <div id="comments" role="comment">
        {comments.reverse().map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))}
      </div>
    </article>
  );
};

export default Post;
