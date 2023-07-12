import React, { useEffect, useState } from "react";
import PostLike from "../likes/PostLike";
import PostLikeForm from "../likes/PostLikeForm";
import CommentForm from "../comment/CommentForm";
import Comment from "../comment/Comment";

const Post = ({ post, token, setToken }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [authorImgSrc, setAuthorImgSrc] = useState(null);
  const [postLikes, setPostLikes] = useState([{ likes: [] }]);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  const handleZoom = () => {
    setIsZoomed(true);
  };

  useEffect(() => {
    if (post._id && post.image && post.image.data) {
      // Check if the post has image data
      fetch(`/posts/image/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setImgSrc(objectURL);
        });
    }
  }, [post, token]);

  useEffect(() => {
    const fetchPostLikes = async () => {
      const response = await fetch("/postlikes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));
      if (data.likes.length !== 0) {
        setPostLikes(data.likes);
        console.log("this is data.likes");
        console.log(data.likes);
        console.log("this is data");
        console.log(data);
      }
    };

    fetchPostLikes();
  }, [liked]);

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
    if (post.authorId) {
      fetch(`/profiles/${post.authorId}/profileImage`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.blob())
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob);
          setAuthorImgSrc(objectURL);
        });
    }
  }, [post, token]);

  const handleNewComment = (comment) => {
    setComments((prevComments) => {
      const newComments = [...prevComments, comment];
      const reversedComments = newComments.reverse();
      return reversedComments;
    });
  };

  console.log(postLikes);
  return (
    <div>
      <div className="author-details">
        <div className="author">
          <img className="author-image" src={authorImgSrc} alt="Author" />
        </div>
        <div className="text-details">
          <div className="username">@{post.username}</div>
          <div className="time">{post.time}</div>
        </div>
      </div>
      <div className="message">{post.message}</div>
      <PostLikeForm
        token={token}
        postId={post._id}
        liked={liked}
        setLiked={setLiked}
      />
      <PostLike like={postLikes[0].likes.length} />
      <div
        className="post-container"
        data-cy="post"
        key={post._id}
        id={post._id}
      >
        <CommentForm
          token={token}
          onNewComment={handleNewComment}
          postId={post._id}
        />
        <div id="comment-feed">
          {comments
            .filter((comment) => comment.postId === post._id)
            .map((comment) => (
              <div key={comment._id}>
                <Comment comment={comment} />
              </div>
            ))}
        </div>
      </div>
      {imgSrc && (
        <div className={`post-image-container ${isZoomed ? "zoomed" : ""}`}>
          <img
            className="post-image"
            src={imgSrc}
            alt="Post"
            onClick={handleZoom}
          />
          {isZoomed && (
            <div className="zoomed-image-container">
              <img className="zoomed-image" src={imgSrc} alt="Zoomed Post" />
              <button
                className="zoomed-image-close-button"
                onClick={() => setIsZoomed(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
