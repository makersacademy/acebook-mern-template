import React, { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import "./CommentFeed.css"

const CommentFeed = ({ post_id, navigate }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newComment, setNewComment] = useState("");

  // Declare fetchData function
  const fetchData = async () => {
    if (token) {
      try {
        const response = await fetch(`/comments/${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setComments(data.comments);
        } else {
          console.error("Error fetching comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };
  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts
  }, [token]); // Only fetch data when token changes to avoid issues with frequent rendering

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      console.error("You cannot create an empty comment");
      return;
    }

    const response = await fetch(`/comments/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: newComment }),
      post_id: post_id,
    });

    if (response.ok) {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));
      // setComments(data.comments);
      setNewComment("");
      fetchData(); // Fetch data after updating the state
    } else {
      console.error("Error creating comment");
    }
  };

  return (
    <>
      <div className="comments-section" id="comment-feed" role="feed">
        Comments:
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))
        ) : (
          <p data-cy="no-comments-message">
            No one has commented yet - be the first!
          </p>
        )}
      </div>

      {/* new comment section */}
      <div className="new-comment-section" id="new-comment">
        <form onSubmit={handleCommentSubmit} data-cy="comment-form">
          <label>
            New comment:
            <input
              type="text"
              name="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              data-cy="new-comment-input"
            />
          </label>
          <button type="submit">💬</button>
        </form>
      </div>
    </>
  );
};
export default CommentFeed;
