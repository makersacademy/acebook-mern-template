import React from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';

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
        {/* {const sortedComments = post.comments.sort(
          (objA, objB) => Number(objA.created) - Number(objB.created))
        } */}
        {post.comments.map((comment) => {
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
