import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePost from "../create-post/CreatePost";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
          <h1 className="d-flex justify-content-center mt-5">acebook.</h1>
          <h2>Posts</h2>
          <div>
            <button onClick={logout}>Logout</button>
          </div>

          <Col md={12}>
            <CreatePost />
          </Col>

          <Row className="justify-content-md-center">
            <Col md={6}>
              <div id="feed" role="feed">
                {posts.map((post) => {
                  return <Post post={post} key={post._id} />;
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
