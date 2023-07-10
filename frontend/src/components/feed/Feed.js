import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Comment from "../comment/Comment";
import PostForm from "../post/PostForm";
import CommentForm from "../comment/CommentForm";
import LikeForm from "../likes/LikeForm";
import Like from "../likes/Like";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
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
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setComments(data.comments.reverse());
      } else {
        setComments([]); // Set empty comments array when there is no token
      }
    };

    fetchComments();
  }, [token]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/likes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setLikes(data.likes);
      } else {
        setLikes([]); // Set empty comments array when there is no token
      }
    };

    fetchLikes();
  }, [token]);

  const handleNewPost = (post) => {
    setPosts((prevPosts) => {
      const newPosts = [...prevPosts, post];
      const reversedPosts = newPosts.reverse();
      return reversedPosts;
    });
  };
  const handleNewComment = (comment) => {
    // console.log(`This is in handleNewComment ${comment}`);
    setComments((prevComments) => {
      const newComments = [...prevComments, comment];
      const reversedComments = newComments.reverse();
      return reversedComments;
    });
  };

  if (token) {
    return (
      <>
        <div className="create-post-container">
          <PostForm token={token} onNewPost={handleNewPost} />
        </div>
        <div className="main-posts-container">
          <h2>Posts</h2>
          <div id="feed" role="feed">
            {posts.map((post) => (
              <div key={post._id} className="post-container">
                <Post post={post} token={token} />
                <LikeForm token={token} postId={post._id} />
                <Like like={likes} />
                <CommentForm
                  token={token}
                  onNewComment={handleNewComment}
                  postId={post._id}
                />
                <div id="comment-feed">
                  {comments
                    .filter((comment) => comment.postId === post._id)
                    .map((comment) => (
                      <Comment comment={comment} key={comment._id} />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Feed;
