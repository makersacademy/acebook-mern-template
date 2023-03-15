import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CommentList from "../commentList/CommentList";
import NewComment from "../newComment/NewComment";

const Comments = ({ postId, updateCommentCount }) => {
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const getComments = async () => {
    if (token) {
      const response = await fetch(
        `/posts/comment?${new URLSearchParams({ postId })}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.log(response);
        // Render Modal with generic error message
      } else {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(data.token);
        setComments(data.postComments);
      }
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div id="comments-container">
      <CommentList comments={comments} />
      <NewComment
        getComments={getComments}
        postId={postId}
        updateCommentCount={updateCommentCount}
      />
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  updateCommentCount: PropTypes.func.isRequired,
};

// Post >> Button in Post.js >> Open Comments.js [CommentList.js, NewComment.js] >> CommentList.js [Comment.js]
export default Comments;
