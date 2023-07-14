import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import "./Profile.css";
import "../feed/Feed.css";

const Profile = ({ navigate }) => {
  const [user, setUser] = useState({
    username: "",
    photo: "",
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
        });
    }
  }, []);

  if (token) {
    return (
      <>
        <div className="profile-container">
          <h1>{user.username}</h1>
          <div>
            {user.photo && (
              <img
                className="profile-photo"
                src={`/profilePhotos/${user.photo}`}
                alt="Profile photo"
              />
            )}
          </div>
          <div className="feed-wrapper">
            <div role="feed" className="feed-posts">
              {posts.map((post) => (
                <Post
                  post={post}
                  key={post._id}
                  // onLike={handleLike}
                  // onUnlike={handleUnlike}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/login");
  }
};

export default Profile;
