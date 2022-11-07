import React from 'react';
import './Post.css';
import CommentForm from '../postCommentForm/CommentForm';

const Post = ({ post }) => {
  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <br></br>
        {post.message}
        {/* {post.createdAt} */}
        <br></br>
        <CommentForm />
      </article>
    </div>
  );
};

export default Post;
