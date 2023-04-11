import React, {useState} from "react";
import LikeButton from "../likes/LikeButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Post = ({ post }) => {

  const [likes, setLikes] = useState(post.likes);

  const handleLikeClick = async () => {
    try {
      await fetch(`/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ likes: likes + 1 }),
      });
      console.log("Liked post with ID: ", post._id);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div>
      <article data-cy="post" key={post._id}>
        <div>{post.user && post.user.name}</div>
        <div>{post.message}</div>{" "} 
        <LikeButton likes={likes} onClick={handleLikeClick} />
      </article>
    </div>
  );
};

export default Post;
