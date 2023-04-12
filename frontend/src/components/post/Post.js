import React, { useEffect, useState } from "react";
import LikeButton from "../likes/LikeButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
// import { useParams } from "react-router-dom";

const Post = ({ post }) => {
  const date = moment(`${post.createdAt}`).format("MMMM Do YYYY, h:mm:ss a");
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
    console.log(response)
    if (response.status !== 201) {
      let errorMessage = await response.text();
      console.log(`error saving your comment: ${errorMessage}`);
    } else {
      console.log("your comment saved to db");
  
    }

    // setMessage("");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


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
        <div> {console.log(post)}</div>
        <div>
          <img src={post.user.image} className="profileImage"></img> 
          {post.user && post.user.name}
        </div>
        <div>{post.message}</div>
        <div>{date}</div>
        <LikeButton likes={likes} onClick={handleLikeClick} />
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
        <div>
          {post.comments && post.comments.length > 0 && (
            <span>
              {post.comments.map((comment) => {
                console.log(comment)
                return <div key={comment._id}>{comment.user.name} commented : {comment.message}</div>;
              })}
            </span>
          )}
        </div>
      </article>
    </div>
  );
};

export default Post;
