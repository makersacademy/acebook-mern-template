import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../post/PostForm";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    const fetchPosts = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("console log from line 27. Print out all posts");
        console.log(data);
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPosts(data.posts.reverse());
      } else {
        setPosts([]); // Set empty posts array when there is no token
      }
    };

    fetchPosts();
  }, [token, navigate]);

  useEffect(() => {
    const fetchComments = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/comments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setComments(data.comments.reverse());
      } else {
        setComments([]); // Set empty comments array when there is no token
      }
    };

    fetchComments();
  }, [token]);

  const handleNewPost = (post) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, post];
      const reversedPosts = newPosts.reverse();
      return reversedPosts;
    });
  };
  const handleNewComment = (comment) => {
    setComments((prevComments) => {
      const newComments = [...prevComments, comment];
      const reversedComments = newComments.reverse();
      return reversedComments;
    });
  };

  const handleUpdatedLikes = (postId, likes) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: likes } : post
      )
    );
  };

  const handleUpdatedCommentLikes = (commentId, likes) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, likes: likes } : comment
      )
    );
  };

  if (token && token !== "null" && token !== "undefined") {
    return (
      <>
        <div className="create-post-container">
          <PostForm token={token} onNewPost={handleNewPost} posts={posts} />
        </div>
        <div className="main-posts-container">
          <h2>Posts</h2>
          <div id="feed" role="feed">
            {posts.map((post) => (
              <div key={post._id} className="post-container">
                <Post
                  post={post}
                  token={token}
                  setToken={setToken}
                  likes={post.likes}
                  onUpdatedLikes={handleUpdatedLikes}
                  navigate={navigate}
                  handleNewComment={handleNewComment}
                  comments={comments}
                  handleUpdatedCommentLikes={handleUpdatedCommentLikes}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return <h2>You must be logged in to view the posts</h2>;
  }
};

export default Feed;
