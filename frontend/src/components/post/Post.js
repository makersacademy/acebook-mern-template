import React, { useEffect, useState } from "react";
import LikeButton from "../likes/LikeButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import moment from "moment";
// import { useParams } from "react-router-dom";

const Post = ({ post, onNewPost }) => {
  //const date = moment(`${post.createdAt}`).format("MMMM Do YYYY, h:mm:ss a");
  const relativeTime = moment(post.createdAt).fromNow();
  // console.log(date)
  const [comment, setComment] = useState("");

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
        <img src={post.photo} className="postPhoto img-fluid"></img>

        <div>
          <LikeButton likes={likes} onClick={handleLikeClick} />
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-right">
            <Col md={6}>
              <Form.Group
                className="mb-3"
                // controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  type="text"
                  // id="message"
                  value={comment}
                  rows={1}
                  placeholder="Write a comment..."
                  onChange={handleCommentChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-right">
            <Col md={6}>
              <Button variant="primary" type="submit" id="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div data-cy="comment" key={post._id}>
        {post.comments && post.comments.length > 0 && (
          <div className="commentSection">
            {post.comments.map((comment) => {
              console.log(comment);
              return (
                <div className="commentInfo" key={comment._id}>
                  <img
                    src={comment.user.image}
                    className="commentProfileImage"
                  ></img>
                  <div className="commentUserInfo">
                    <span className="commentUserName">{comment.user.name}</span>
                    <span className="commentMessage">{comment.message}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
};

export default Post;
