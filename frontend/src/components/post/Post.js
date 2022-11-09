import React, { useState } from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';
import Comment from '../postComment/PostComment.js';

// const arrNow = post.comment

const Post = ({ post }) => {
  // const handleClick = () => {
  //   console.log('Clicked');
  //   var x = document.getElementById('hideComments');
  //   if (x.style.display === 'none') {
  //     x.style.display = 'block';
  //   } else {
  //     x.style.display = 'none';
  //   }
  // };
  const [show, setShow] = useState(true);
  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <br></br>
        {post.message}
        <br></br>
        <button onClick={() => setShow(true)}>Show Comments</button>
        <button onClick={() => setShow(false)}>Hide Comments</button>
        <br></br>
        {show ? (
          <div id="hideComments">
            <CommentForm postId={post._id} />
            <br></br>
            {post.comments
              .slice(0)
              .reverse()
              .map((comment) => (
                <Comment comment={comment} key={post.id} />
              ))}
          </div>
        ) : null}
      </article>
    </div>
  );
};

export default Post;
