import React, { useState } from "react";
import "./SignUpForm.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SignUpForm.css";

const SignUpForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("image", image);

    let response = await fetch("/users", {
      method: "post",
      headers: {
        // "Content-Type": "application/json",
      },
      body: formData,
    });

    if (response.status === 201) {
      navigate("/login");
    } else {
      setError("This email already exists: ");
      setEmail("");
      setName("");
      setPassword("");
      navigate("/signup");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Container>
      <div className="d-flex justify-content-end mt-3">
          <Button variant="outline-primary" size="sm" href="/login">
            Already have an account? Sign in now
          </Button>
        </div>
      <h1 className="d-flex justify-content-center mt-5">acebook.</h1>
      <div className="d-flex justify-content-center sign-up-form">
        <Form onSubmit={handleSubmit} className="">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select an image to upload:</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              name="image"
            />
          </Form.Group>
          {error && (
            <div className="alert alert-danger">
              {error}
              <a href="/login">Please login</a>{" "}
            </div>
          )}
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" id="submi">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpForm;
