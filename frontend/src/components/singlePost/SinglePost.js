import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";

const SinglePost = ({ navigate }) => {
  const [post, setPost] = useState({
    user: { email: "" },
    message: "",
    _id: "",
  });
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const params = useParams();

  useEffect(() => {
    if (token) {
      fetch(`/posts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPost(data.post);
        });
    }
  }, []);

  if (token) {
    return (
      <>
        <h2>Post</h2>
        <div id="feed" role="feed">
          <Post post={post} key={post._id} />
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default SinglePost;
