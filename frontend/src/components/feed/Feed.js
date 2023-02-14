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

  const post = () => {};

  

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

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        };
      } else {
        return post;
      }
    }));
  };


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };


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
            <h2>Posts</h2>
            <form onSubmit={handleSubmitPost}>
              <textarea
                placeholder="Write your post here"
                id="message"
                type="message"
                defaultValue={post}
                onChange={handleMessageChange}
              />
              <br />
              <input id="submitPost" type="submit" value="Submit" />
            </form>

            <div id="feed" role="feed">
              {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                <div class="post" key={post._id} data-cy="post">
                  <div data-cy="userName" class="postUserName">
                    {post.userName}
                    <div data-cy="timestamp" class="postTimestamp">
                      {console.log(post)}
                      {post.createdAt && new Date(post.createdAt).toISOString().split('.')[0].replace('T', ' ')}
                    </div>
                  </div>

                  <Post
                    post={post}
                    setPosts={setPosts}
                    posts={posts}
                    token={token}
                    user={user}
                    setUser={setUser}
                    navigate={navigate}
                    onAddComment={(comment) => handleAddComment(post._id, comment)}
                  />
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
