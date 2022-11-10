import React, { useEffect, useState } from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';
import Comment from '../postComment/PostComment.js';
import LikeButton from '../likeButton/LikeButton';

const Post = ({ post, reload }) => {
  const [show, setShow] = useState(true);

  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <br></br>
        {post.message}
        <br></br>
        <button onClick={() => setShow(!show)}>Toggle Comments</button>
        <img src={post.imageUrls} alt="post-img" margin="20" width="300" />
        <CommentForm postId={post._id} />
        <br></br>
        <LikeButton postId={post._id} />
        {show ? (
          <div id="hideComments">
            <CommentForm postId={post._id} reload={reload} />
            <br></br>
            {post.comments
              .slice(0)
              .reverse()
              .map((comment) => (
                <Comment comment={comment} key={post.id} reload={reload} />
              ))}
          </div>
        ) : null}
      </article>
    </div>
  );
};

export default Post;
