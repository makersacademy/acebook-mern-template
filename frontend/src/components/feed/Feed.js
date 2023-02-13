import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");

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

  const post = () => {};

  const [user, setUser] = useState({});

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
        };

        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmitPost = async (event) => {
    // event.preventDefault(); This line stops the page refreshing automatically so it has been commented out

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        userName: `${user.firstName} ${user.lastName}`,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/posts");
      } else {
        navigate("/signup");
      }
    })
}

  const handleCommentPost = async(event) => {}


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

   const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

 if (token) {
    return (
      <>
        <div>
          <nav className="nav">
            <a href="/posts" className="site-title">
              Acebook
            </a>
            <ul>
              <button onClick={logout}>Logout</button>
              <br></br>
            </ul>
          </nav>
          <div id="feedComponent">
            <h2>Posts</h2>
            <form onSubmit={handleSubmitPost}>
              <input
                placeholder="Write your post here"
                id="message"
                type="message"
                defaultValue={post}
                onChange={handleMessageChange}
              />
              <input id="submit" type="submit" value="Submit" />
            </form>

            <div id="feed" role="feed">
              {posts.map((post) => (
                <div class="post" key={post._id} data-cy="post">
                  <div data-cy="userName" class="postUserName">
                    {post.userName}
                  </div>
                  
                  <Post
                    post={post}
                    setPosts={setPosts}
                    posts={posts}
                    token={token}
                  />
                  
                  <div class="postContent">{post.message}</div>
                  
                  <div class="postButtons">
                        <button id='like'>Like</button>
                        <button id='delete'>Delete</button>
                        <input id='commentButton' type="submit" value="Comment" />
                        <div class="commentField">
                          <form onSubmit={handleCommentPost}>
                              <input placeholder="Write your comment here" id="comment" type='comment' defaultValue={comment} onChange={handleCommentChange} />
                          </form>
                        </div>
                      </div>

                      <div class="comments">
                      Comments:
                      </div>

                      {post.comments.map((comment) => (
                        <div data-cy="comment" class="comment">
                          {comment.message}
                        </div>  
                      ))}

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
