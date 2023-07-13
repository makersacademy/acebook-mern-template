import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import "./Profile.css";

const Profile = ({ navigate }) => {
  const [user, setUser] = useState({
    email: "",
  });
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const params = useParams();

  useEffect(() => {
    if (token) {
      fetch(`/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setUser(data.user);
        });

      fetch(`/posts/user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
          // setRefreshFeed(false)
        });
    }
  }, []);

  if (token) {
    return (
      <>
        <h1>Profile page</h1>
        <h2>Email: {user.username}</h2>
        <div>
          {user.photo && (
            <img
              className="profile-photo"
              src={`/profilePhotos/${user.photo}`}
              alt="Profile photo"
            />
          )}
        </div>
        <div id="feed" role="feed" className="posts">
          {posts.map((post) => (
            <Post
              post={post}
              key={post._id}
              // onLike={handleLike}
              // onUnlike={handleUnlike}
            />
          ))}
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Profile;
