import React from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';

// const arrNow = post.comment

const Post = ({ post }) => {
  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <br></br>
        {post.message}
        {/* {post._id} */}
        <br></br>
        <CommentForm postId={post._id} />
        <br></br>
        {console.log(post.comments.length)}
        {post.comments
          .slice(0)
          .reverse()
          .map((comment) => {
            return (
              <p>
                {comment.text}
                <br></br>
                {comment.created}
              </p>
            );
          })}
      </article>
    </div>
  );
};

export default Post;
