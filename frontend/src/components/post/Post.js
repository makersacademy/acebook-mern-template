import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Comment from "../comment/Comment";
import CreateComment from "../create-comment/CreateComment";
import "./Post.css";

const Post = ({ post }) => {
  // post is the
  const [likes, setLikes] = useState(post.likes.length || 0);
  const [isLiked, setLiked] = useState(post.liked);
  const [comments, setComments] = useState(post.comments);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const createdAt = new Date(post.createdAt);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });

  useEffect(() => {}, []);

  const toggleLike = async () => {
    let url = "/posts/" + post._id + "/likes";
    let response = await fetch(url, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.json().then(async (data) => {
      setToken(window.localStorage.getItem("token"));
      setLikes(data.likes); //JSON web token response containing updated number of likes (toggleLike method in api Controller/posts)
      setLiked(data.liked); //JSON web token updates 'like' status
    });
  };

  const fetchData = () => {
    if (token) {
      fetch("/posts/" + post._id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setComments(data.comments);
          
        });
    }
  };

  return (
    <article data-cy="post" key={post._id} className="post-container">
      <img src={require(`../avatars/avatar-${post.user.avatar}.jpg`)} width='20' height='20' alt="Default Avatar" />
      <strong><a href={"/user/" + post.user._id}>{post.user.name}</a> ({result}):</strong> 
      <p></p>
      <div>{post.message} </div>

      <div>
        <button className="likes-container" onClick={toggleLike}>
          {isLiked ? "unlike" : "like"}
        </button>
        {likes} {likes !== 1 ? "likes" : "like"}
      </div>

      <div id="comments" role="comment">
        <ul>
          {comments.reverse().map((comment) => (
            <li>
              <Comment comment={comment} key={comment._id} />
            </li>
          ))}
          <CreateComment fetchData={fetchData} postId={post._id} />
        </ul>
      </div>
    </article>
  );
};

export default Post;
