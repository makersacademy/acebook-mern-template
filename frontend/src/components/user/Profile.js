import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

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

  useEffect(() => {
    const fetchUser = async () => {
      const email = window.localStorage.getItem("email");
      const url = `/users?email=${email}`;

      try {
        const response = await fetch(url, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        const userData = {
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          userId: data.user._id
        };
        console.log(data)
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);


 if (token) {
    return (
      <>
        <div>
          <nav className="nav">
            <a href="/posts" className="site-title">
              acebook
            </a>
            <ul>
              <button onClick={logout}>Logout</button>
              <br></br>
            </ul>
          </nav>
          <div id="feedComponent">
            <h1>{`${user.firstName} ${user.lastName}'s Profile Page`}</h1>
            <img class="profilePagePicture" src="graphics-avatar.jpeg" alt="profile" ></img>
          </div>
          <h3 id="bioTitle">Bio</h3>
          <div id="profileBio">

            <div id="bioText">I'm the person with no face but hey, this social media page is just great....</div>
          </div>
          <h3 id="friendsListTitle">Friends List</h3>
          <div id="friendsList">

            <div class="friendElement">You currently have no friends....that's ok if you prefer to keep it simple!</div>
          </div>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
