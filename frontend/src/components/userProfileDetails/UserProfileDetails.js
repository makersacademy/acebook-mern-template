import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfileDetails.css";
import CreatePost from "../createPost/CreatePost";
import Post from "../post/Post";
import { useParams } from 'react-router-dom';



const Profile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [posts, setPosts] = useState(null);
  const [updated, setUpdated] = useState(null)
  const [image, setImageUrl] = useState("");


  let { id } = useParams();
  useEffect(() => {
    if (token) {
      fetch(`/users/${id}`)
        .then((response) => response.json())
        .then(async (data) => {
          setToken(window.localStorage.getItem("token"));
          setUser(data.user);
          setImageUrl(data.user.image);
        });
    }
  }, [id]);

  useEffect(() => {
    if (token) {
      fetch(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          await setPosts(data.posts);
          setUpdated(false)
        });
    }
  }, [updated,id]);

  //  logged in user id  = window.localStorage.getItem("user_id")

  return (
    <>
    <div className="profile-details">
      <h1>My details</h1>
      <p>Name: {user && user.name}</p>
      <p>About me: {user && user.aboutMe}</p>
      <img src={image} className="profilepics" alt="img" />
      <button>Friends List</button>
    </div>
      
      <div className="user-posts">
      <h2 id="post" className="feedHeader">My Posts</h2>
      {(id === window.localStorage.getItem("user_id")) && 
        <CreatePost setUpdated={setUpdated}/>
      }
            <div id='feed' role="feed">
              {posts && posts.sort(function(postA, postB) {
                return (new Date(postB.createdAt) - new Date(postA.createdAt));
              }).map(
                (post) => ( <Post setUpdated={setUpdated} post={ post } key={ post._id } /> )
              )}
          </div>
      </div>
      </>
  );
};

export default Profile;

// {peeps && <PeepList peeps={peeps.filter((peep) => peep.user.id == window.localStorage.getItem('user_id'))} title='My Peeps' />}
