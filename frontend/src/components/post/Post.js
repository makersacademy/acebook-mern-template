import React, { useState } from "react";

const Post = ({ navigate, post, setPosts, posts, token, user, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleDeletePost = async (id) => {
    await fetch(`/posts/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setPosts(posts.filter((post) => post._id !== id));
      }
    });
  };

  const handleCommentPost = async (id) => {
    await fetch(`/posts/${id}/comment`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: `${user.firstName} ${user.lastName}`,
        timeStamp: Date.now(),
        message: comment,
      }),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        const newComment = {
          userName: `${user.firstName} ${user.lastName}`,
          timeStamp: Date.now(),
          message: comment,
        };
        onAddComment(newComment);
        navigate("/posts");
        setComment("");
      } else {
        console.log("An error has occured with submitting the post");
      }
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommentPost(post._id);
    }
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <div class="postContent">{post.message}</div>

      <div class="postButtons">
        <button id="like">Like</button>
        <button onClick={() => handleDeletePost(post._id)}>Delete</button>

        <label htmlFor="comment">
          <button onClick={() => handleCommentPost(post._id)} id="commentButton" type="submit">
            Comment
          </button>
        </label>

        <div class="commentField">
          <form onSubmit={handleCommentPost}>
            <input
              placeholder="Write your comment here"
              id="comment"
              type="comment"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </div>

      <div class="comments">
        <button id="showComments" onClick={toggleComments}>{showComments ? "Hide" : "Show"} comments</button>
        {showComments && (
          <>
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div data-cy="comment" class="comment">
                  {comment.userName}
                  <br />
                  {comment.message}
                  <br />
                  {formattedDate(comment.timeStamp)}
                </div>
              ))
            ) : (
              <div>No comments on this post yet.</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Post;
