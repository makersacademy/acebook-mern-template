import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

/////////////////////////
// This below is code from the exisiting codebase, it might be that it can post messages and the new code below ** is unnecessary.
/////////////////////////

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

  const post = () => {};  /// Does something need to be added to this? Seems important aas the page doesn't work when it's commented out

/////////////////////////
// **This below is new code which handles the fetch to api, sending the new post to the database 
/////////////////////////

const [message, setMessage] = useState("");

const handleSubmitPost = async (event) => {
  // event.preventDefault(); This line stops the page refreshing automatically so it has been commented out

  fetch( '/posts', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message })
  })
    .then(response => {
      if(response.status === 201) {
        navigate('/posts')
      } else {
        navigate('/signup')
      }
    })
}


/////////////////////////
// This below is new code
/////////////////////////

const handleMessageChange = (event) => {
  setMessage(event.target.value)
}

/////////////////////////
// Below is the code for the form that posts the new message
/////////////////////////
  if (token) {
    return (
      <>
        <div>
          <nav className="nav">
              <a href="/posts" className="site-title">
                Acebook
              </a>
              <ul>
                <button onClick={logout}>Logout</button><br></br>
              </ul>
            </nav>
            <div id="feedComponent">
              <h2>Posts</h2>
                <form onSubmit={handleSubmitPost}>
                <input placeholder="Write your post here" id="message" type='message' defaultValue={post} onChange={handleMessageChange} />
                <input id='submit' type="submit" value="Submit" />
                </form>
                <div id="feed" role="feed">
                      {posts.map((post) => (
                        <div class="post">
                          <div class="postContent"><Post post={post} key={post._id} /><br /></div>
                          <div id="postButtons">
                            <button id='like'>Like</button>
                            <button id='comment'>Comment</button>
                          </div>
                        </div>
                      ))}
                </div>
            </div>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
