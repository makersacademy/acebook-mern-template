import React from "react";
import './Post.css'; // import the CSS file
import CreateCommentForm from "../commentForm/CommentForm";

const Post = ({ post, onCreated }) => {

  const handleCommentCreated = () => {
    onCreated();
  };

  if (post.message !== "") { // Quickfix to remove empty submits
    return (
      <article data-cy="post" className="post" key={post._id}>
        <p className="message">{post.message}</p>
        <div className="comments-container">
            <CreateCommentForm postId={post._id} onCreated={handleCommentCreated} />
          <div className="comments">
            {post.comments.map((comment) => (
              <p>{comment}</p>
            ))}
          </div>
        </div>
      </article>
    );
  }
  return null;
};

export default Post;
