import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreatePost = (navigate) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    //event.preventDefault();

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      },
      body: JSON.stringify({ message: message }),
    });

    if (response.status !== 201) {
      console.log("error saving your post");
    } else {
      console.log("your post saved to db");
      navigate("/posts");

    }

    setMessage("");
  }

  const handlePostChange = (event) => {
    setMessage(event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form.Group className="mb-3" 
          // controlId="exampleForm.ControlTextarea1"
          >
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
          <Form.Group className="mb-3">
            <Form.Label>Select an image to upload:</Form.Label>
            <Form.Control type="file"  />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Button variant="primary" type="submit" id="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreatePost;
