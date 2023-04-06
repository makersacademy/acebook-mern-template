import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Post = ({ post }) => {
  return (
    <div>
      <article data-cy="post" key={post._id}>
      <div> {console.log(post)}</div>
        <div> <img src={post.user.image} className="profileImage"></img> {post.user && post.user.name}</div>
        <div>{post.message}</div>
      </article>
      <FontAwesomeIcon icon={faThumbsUp} />
    </div>
  );
};

export default Post;
