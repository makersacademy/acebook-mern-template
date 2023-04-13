import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import CreatePost from "../create-post/CreatePost";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Row, Container, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import './Feed.css'

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
          <nav className="navbar">
            <div className="nav-container">
              <div className="nav-logo">
                <h5>a.</h5>
              </div>
              <div className="nav-elements">
                <Nav.Link href="/posts">
                  <FontAwesomeIcon icon={faHouse} size="xl" />
                </Nav.Link>

                <Nav.Link href="/posts">
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </Nav.Link>

                <Nav.Link href="#profile">
                  <FontAwesomeIcon icon={faUser} size="xl" />
                </Nav.Link>

                <Nav.Link onClick={logout} href="#" className="me-auto">
                  <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
                </Nav.Link>
              </div>
            </div>
          </nav>

          <h1 className="d-flex justify-content-center mt-4 main-title">acebook.</h1>

          <Col md={12}>
            <Container className="py-1">
            <Card className="px-3 pt-3 shadow-sm p-3 mb-5 bg-white rounded border-0">
              <CreatePost handleNewPost={handleNewPost} />
              </Card>
              </Container>
          </Col>

          <Row className="justify-content-md-center">
            <Col md={6}>
              <div id="feed" role="feed">
                {posts.map((post) => {
                  return (
                    <Container className="py-1">
                      <Card className="shadow-sm px-3 py-2 mb-2 bg-white rounded border-0">
                    <Post
                      key={post._id}
                      post={post}
                      onNewPost={handleNewPost}
                        />
                      </Card>
                    </Container>
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
