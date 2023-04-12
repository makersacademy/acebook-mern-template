import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreatePost = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", image);

    let response = await fetch("/posts", {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      },
      body: formData,
    });

    if (response.status !== 201) {
      console.log("error saving your post");
    } else {
      console.log("your post saved to db");
    }

    setMessage("");
    setImage(null);
  }

  const handlePostChange = (event) => {
    setMessage(event.target.value);
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
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
            <Form.Control type="file" onChange={handleImageChange}  />
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
