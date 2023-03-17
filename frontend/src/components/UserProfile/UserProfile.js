import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
// import "./Post.css";
import Post from "../post/Post"
import { useParams } from "react-router";


const UserProfile = ({ navigate }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const userid = useParams();
  

  async function fetchUser() {
    
    const url = "/user/" + userid.id;
    // console.log(url)
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },  
    })

    const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"))
      setUser(data.user);
      console.log(user)
  }

    const fetchPosts = () => {
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
            let filterPosts = Object.fromEntries(Object.entries(data.posts).filter(post => userid.id === post[1].user._id));
            filterPosts = Object.values(filterPosts);
            setPosts(filterPosts);
          });
      }
    };

    useEffect(() => {
      if (token) {
        fetchUser();
        fetchPosts();
      } else {
        navigate("/login");
      };
    }, []);

    
      return(
        <>
        <div id="username" role="username">
        
          <h1>{user.name}</h1>
        </div>
        <div><img src={require(`../avatars/avatar-${user.avatar ? user.avatar : "1"}.jpg`)} width='20' height='20' alt="Default Avatar" />
          <h1>{user.name}'s posts</h1>
            {[...posts].reverse().map((post) => (
              <Post post={post} key={post._id} />
            ))}
        </div>
        </>
      )    
    
}


export default UserProfile;
