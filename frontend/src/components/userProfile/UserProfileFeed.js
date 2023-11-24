import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../post/Post";
import Header from "../user/header/Header"

const UserProfileFeed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const user_id = useParams();




  // authentication
  useEffect(() => {
      if(token) {
        fetch(`${user_id.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(async data => {
            window.localStorage.setItem("token", data.token)
            setToken(window.localStorage.getItem("token"))
            setPosts(data.posts);
          })
          .catch(error => console.error('Error fetching user profile:', error))
      }
    }, [token, user_id])

    
  // Users posts: filter list of posts on the basis of user_id

  if (token) {
    console.log("PROLE PAGE USER ID=", user_id)
    return (
      <>
        <Header user_id={ user_id.user_id } />
        <div id="user-profile-feed" role="feed">
          <h3> Recent Posts: </h3>
        {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => <Post post={post} key={post._id} />)
          ) : (
            <p data-cy="no-posts-message">No posts yet :( </p>
          )}
        </div>
      </>
    );
  } else {
    navigate("/../login");
  }
};
export default UserProfileFeed;
