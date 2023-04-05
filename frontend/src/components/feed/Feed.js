import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreatePost from "../create/Create";


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

  const handleNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  if (token) {
    return (
      <>
        <Container>
          <h2>Posts</h2>

          <div>
            <button onClick={logout}>Logout</button>
          </div>
          <div className="">
            <CreatePost onNewPost={handleNewPost} />
          </div>
          <Row className="justify-content-md-center mt-3">
            <Col md={8}>
              <div id="feed" role="feed">
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
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
