import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Comment from "../comment/Comment";
import PostForm from "../post/PostForm";
import CommentForm from "../comment/CommentForm";
import PostLikeForm from "../likes/PostLikeForm";
import CommentLikeForm from "../likes/CommentLikeForm";
import PostLike from "../likes/PostLike";
import CommentLike from "../likes/CommentLike";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [comments, setComments] = useState([]);
  const [postlikes, setPostLikes] = useState([]);
  const [commentlikes, setCommentLikes] = useState([]);

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
    const fetchPostLikes = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/postlikes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setPostLikes(data.likes);
      } else {
        setPostLikes([]); // Set empty likes array when there is no token
      }
    };

    fetchPostLikes();
  }, [token]);

  useEffect(() => {
    const fetchCommentLikes = async () => {
      if (token && token !== "null" && token !== "undefined") {
        const response = await fetch("/commentlikes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setCommentLikes(data.likes);
      } else {
        setCommentLikes([]); // Set empty likes array when there is no token
      }
    };

    fetchCommentLikes();
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

  const handleNewPostLike = (postId, token) => {
    setPostLikes((prevLikes) => {
      if (prevLikes !== null) {
        const existingLike = prevLikes.find((like) => like.postId === postId);
        if (existingLike) {
          // Remove the like from the likes array
          return prevLikes.filter((like) => like.postId !== postId);
        } else {
          // Add the new like to the likes array
          return [...prevLikes, { postId }];
        }
      }
    });
  };

  const handleNewCommentLike = (commentId, token) => {
    setCommentLikes((prevLikes) => {
      const existingLike = prevLikes.find(
        (like) => like.commentId === commentId
      );
      if (existingLike) {
        // Remove the like from the likes array
        return prevLikes.filter((like) => like.commentId !== commentId);
      } else {
        // Add the new like to the likes array
        return [...prevLikes, { commentId }];
      }
    });
  };

  if (token && token !== "null" && token !== "undefined") {
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
                <PostLikeForm
                  token={token}
                  postId={post._id}
                  onNewLike={(postId) => handleNewPostLike(postId, token)} // Pass token along with postId
                />
                <PostLike
                  haha={console.log(postlikes)}
                  like={
                    postlikes !== null
                      ? postlikes.filter((like) => like.postId === post._id)[0]
                          .likes.length
                      : null
                  }
                />
                <CommentForm
                  token={token}
                  onNewComment={handleNewComment}
                  postId={post._id}
                />
                <div id="comment-feed">
                  {comments
                    .filter((comment) => comment.postId === post._id)
                    .map((comment) => (
                      <>
                        <Comment comment={comment} key={comment._id} />
                        <CommentLikeForm
                          token={token}
                          commentId={comment._id}
                          onNewLike={(commentId) =>
                            handleNewCommentLike(commentId, token)
                          } // Pass token along with postId
                        />
                        <CommentLike
                          like={
                            postlikes !== null
                              ? postlikes.filter(
                                  (like) => like.postId === post._id
                                ).length
                              : null
                          }
                        />
                      </>
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
