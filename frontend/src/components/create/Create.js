import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ message: message }),
    });

    if (response.status !== 201) {
      console.log("error saving your post");
    } else {
      console.log("your post saved to db");
    }
  }

  const handlePostChange = (event) => {
    setMessage(event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Write your post here...</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              // id="message"
              value={message}
              rows={3}
              placeholder="Say what's on your mind today..."
              onChange={handlePostChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Button variant="primary" type="submit" id="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePost;
