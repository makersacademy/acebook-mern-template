import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../create-post/CreatePost";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleNewPost = (newPost, comment) => {
    if (comment) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === newPost._id ? newPost : post))
      );
    } else {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    }
  };

  useEffect(() => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  if (token) {
    return (
      <>
        <Container>
          <Navbar bg="light" variant="light">
            {/* <div className="d-flex justify-content-between"> */}
            <Nav>
              <Navbar.Brand href="#">
                <h5>a.</h5>
              </Navbar.Brand>

              <Nav.Link href="/posts">
                <FontAwesomeIcon icon={faHouse} size="2xl" />
              </Nav.Link>

              <Nav.Link href="/posts">
                <FontAwesomeIcon icon={faPlus} size="2xl" />
              </Nav.Link>

              <Nav.Link href="#profile">
                <FontAwesomeIcon icon={faUser} size="2xl" />
              </Nav.Link>

              <Nav.Link onClick={logout} href="#" className="me-auto">
                <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
              </Nav.Link>
            </Nav>
          </Navbar>

          <h1 className="d-flex justify-content-center mt-5">acebook.</h1>
          <h2>Posts</h2>

          <Col md={12}>
            <CreatePost handleNewPost={handleNewPost} />
          </Col>

          <Row className="justify-content-md-center">
            <Col md={6}>
              <div id="feed" role="feed">
                {posts.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      post={post}
                      onNewPost={handleNewPost}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Feed;
