import React, { useEffect, useState } from "react";
import Post from "../post/Post";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [imageURL, setImageURL] = useState(null);
  
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

  const profile = () => {
    navigate("/profile");
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    
    try {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file)
    console.log(formData)
    
    
    const response = await fetch("/posts/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const data = await response.json()
    console.log(data);
    setImageURL(data.url);
    
    } catch (error) {
      console.error(error);
    }
    console.log(imageURL)
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
          userId: data.user._id,
          profilePicture: data.user.profilePicture
        };
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    
  }, []);
  
  useEffect(() => {
    console.log(user);
  }, [user]);
  
  const handleSubmitPost = async (event, imageURL) => {
    console.log(user.profilePic)
    // event.preventDefault(); 
    const postBody = {
      message: message, 
      userName: `${user.firstName} ${user.lastName}`,
      profilePicture: `${user.profilePicture}`
    };

    if (imageURL) {
      postBody.imageURL = imageURL;
    }

    fetch("/posts", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
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
              <a href="/profile" id="profile-nav" onClick={profile}>Profile</a>
              <a href="/login" id="logout-nav"onClick={logout}>Logout</a>
              <br></br>
            </ul>
          </nav>
          <div id="feedComponent">
            <div className='title-posts'></div><h2>Posts</h2>
            <form onSubmit={(event) => handleSubmitPost(event, imageURL, user)}>
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

            <div>
              <form class="chooseFile">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </form>
            </div>

            <div id="feed" role="feed">
              {posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
                <div class="post" key={post._id} data-cy="post">
                  <div data-cy="userName" class="postUserName">
                    {post.userName}
                    <div data-cy="timestamp" class="postTimestamp">
                      {post.createdAt && new Date(post.createdAt).toISOString().split('.')[0].replace('T', ' ')}
                    </div>
                  </div>
                  <div data-cy="profilePicDiv" class="profilePicDiv">
                      <img class="profilePic" src={post.profilePicture} alt=''/>
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
                    imageURL={imageURL}
                    authorProfilePic={post.profilePic}
                  />
                </div>
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

export default Feed;
