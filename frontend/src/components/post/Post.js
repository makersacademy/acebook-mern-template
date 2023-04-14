import React, { useEffect, useState } from "react";
import LikeButton from "../likes/LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import moment from "moment";
// import { useParams } from "react-router-dom";

const Post = ({ post, onNewPost }) => {
  //const date = moment(`${post.createdAt}`).format("MMMM Do YYYY, h:mm:ss a");
  const relativeTime = moment(post.createdAt).fromNow();
  // console.log(date)
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const userId = localStorage.getItem("user_id");
  const isLiked = post.likedBy.some((id) => id.toString() === userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch(`/posts/${post._id}/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message: comment }),
    });
    console.log(response);
    if (response.status !== 201) {
      let errorMessage = await response.text();
      console.log(`error saving your comment: ${errorMessage}`);
    } else {
      console.log("your comment saved to db");
      const updatedPost = await response.json();
      onNewPost(updatedPost.post, true);
    }

    setComment("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const [likes, setLikes] = useState(post.likes);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setLikes(updatedPost.likes);
        console.log("Updated likes for post with ID:", post._id);
        onNewPost(updatedPost, true);
      } else {
        console.error("Error updating likes:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleCommentLikeClick = async (commentId) => {
    try {
      const response = await fetch(`/posts/${post._id}/comments/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        onNewPost(updatedPost, true);
        console.log("Updated likes for comment with ID:", commentId);
      } else {
        console.error("Error updating likes:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <article data-cy="post" key={post._id}>
      <div>
        <div> {console.log(post)}</div>
        <div className="postInfo">
          <img src={post.user.image} className="profileImage"></img>
          <div className="postUserInfo">
            <span className="postUserName">{post.user && post.user.name}</span>
            <span className="postTime">{relativeTime}</span>
          </div>
        </div>
        <div>{post.message}</div>
        {post.photo && (
          <img src={post.photo} className="postPhoto img-fluid"></img>
        )}
        <hr />
        <div className="likes">
          <LikeButton
            likes={likes}
            onClick={handleLikeClick}
            isLiked={isLiked}
          />
        </div>
        <hr />
      </div>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-right">
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                type="text"
                // id="message"
                value={comment}
                rows={1}
                placeholder="Write a comment..."
                onChange={handleCommentChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <span className="submit-button" onClick={handleSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </Col>
        </Row>
      </Form>
      {/* </div> */}
      <div data-cy="comment" key={post._id}>
        {showComments && post.comments && post.comments.length > 0 && (
          <div className="commentSection">
            {post.comments.map((comment) => {
              // console.log(comment);
              const isCommentLiked = comment.likedBy.some(
                (id) => id.toString() === userId
              );
              return (
                <div className="commentInfo" key={comment._id}>
                  <img
                    src={comment.user.image}
                    className="commentProfileImage"
                  ></img>
                  <div className="commentUserInfo">
                    <span className="commentUserName">{comment.user.name}</span>
                    <span className="commentMessage">{comment.message}</span>
                    <LikeButton
                      likes={comment.likes}
                      onClick={() => handleCommentLikeClick(comment._id)}
                      isLiked={isCommentLiked}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {post.comments && post.comments.length > 0 && (
        <button
          className="commentButton"
          variant="secondary"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
      )}
    </article>
  );
};

export default Post;
